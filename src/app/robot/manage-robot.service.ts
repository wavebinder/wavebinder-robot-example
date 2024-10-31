import {ElementRef, Injectable, NgZone, OnDestroy} from '@angular/core';
import GUI from 'lil-gui';
import * as THREE from 'three';
import {AnimationClip, AnimationMixer, Clock, Group} from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

@Injectable({providedIn: 'root'})
export class ManageRobotService implements OnDestroy {

	private api: any = {state: 'Walking'};
	private renderer: THREE.WebGLRenderer | any;
	private camera: THREE.PerspectiveCamera | any;
	private readonly scene: THREE.Scene;
	private mixer!: AnimationMixer;
	private actions: any = {}
	private frameId!: number;
	private activeAction: any;
	private previousAction: any;
	private face: any
	private clock: Clock;
	private stats: Stats;
	private canvas: HTMLCanvasElement | any;


	public constructor(private ngZone: NgZone) {
		this.clock = new THREE.Clock();
		this.scene = new THREE.Scene();
		this.stats = new Stats();
	}

	public ngOnDestroy(): void {
		if (this.frameId != null) {
			cancelAnimationFrame(this.frameId);
		}
		if (this.renderer != null) {
			this.renderer.dispose();
			this.renderer = null;
			this.canvas = null
		}
	}

	public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
		this.canvas = canvas.nativeElement;
		this.renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			canvas: this.canvas,
		});
		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.setSize(window.innerWidth / 2, window.innerHeight);
		this.camera = new THREE.PerspectiveCamera(
			45, (window.innerWidth / 2) / window.innerHeight, 0.25, 100
		);
		this.camera.updateProjectionMatrix();
		this.camera.position.set(-5, 3, 10);
		this.camera.lookAt(0, 2, 0);
		this.scene.background = new THREE.Color(0x1B0036)
		this.scene.fog = new THREE.Fog(0x007662, 20, 150);
		// lights
		const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
		hemiLight.position.set(0, 20, 0);
		this.scene.add(hemiLight);
		const dirLight = new THREE.DirectionalLight(0xffffff, 3);
		dirLight.position.set(0, 20, 10);
		this.scene.add(dirLight);
		// ground
		const ground = new THREE.Mesh(new THREE.PlaneGeometry(2000, 2000), new THREE.MeshPhongMaterial({
			color: 0x2D1741,
			depthWrite: false
		}));
		ground.rotation.x = -Math.PI / 2;
		this.scene.add(ground);
		const grid = new THREE.GridHelper(200, 40, 0x00B19D, 0x00B19D);
		grid.material.opacity = 0.2;
		grid.material.transparent = true;
		this.scene.add(grid);
		// model
		const gltfLoader = new GLTFLoader();
		gltfLoader.load('assets/RobotExpressive.glb', (gltf) => {
				this.scene.add(gltf.scene);
				this._createGUI(gltf.animations, gltf.scene)
			},
			undefined,
			function (e) {
				console.error(e);
			});

	}


	private _createGUI(animations: AnimationClip[], model: Group): void {
		const states = ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'];
		const emotes = ['Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp'];
		this.mixer = new THREE.AnimationMixer(model);
		for (let i = 0; i < animations.length; i++) {
			const clip = animations[i];
			const action = this.mixer.clipAction(clip);
			this.actions[clip.name] = action;
			if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
				action.clampWhenFinished = true;
				action.loop = THREE.LoopOnce;
			}
		}

		// states
		let gui = new GUI();
		// expressions
		this.face = model.getObjectByName("Head_4");

		const expressions = Object.keys(this.face.morphTargetDictionary);
		const expressionFolder = gui.addFolder('Expressions');
		for (let i = 0; i < expressions.length; i++) {
			expressionFolder.add(this.face.morphTargetInfluences, i.toString(), 0, 1, 0.01)
				.name(expressions[i]);
		}
		let keyRotationClip = THREE.AnimationClip.findByName(animations, 'Walking');
		this.activeAction = this.mixer.clipAction(keyRotationClip);
		this.activeAction.clampWhenFinished = false;
		this.activeAction.loop = THREE.LineLoop;
		this.activeAction.play();
		this.mixer.addEventListener('finished', () => {
			this._restoreState();
		})
		expressionFolder.open();
		gui.show(false)

	}


	public animate(): void {
		this.ngZone.runOutsideAngular(() => {
			this._render();
			window.addEventListener('resize', () => {
				this._resize();
			});
		});
	}


	private _render(): void {
		if (this.mixer) this.mixer.update(this.clock.getDelta());
		this.frameId = requestAnimationFrame(() => {
			this._render();
		});
		this.renderer.render(this.scene, this.camera);
		this.stats.update();
	}

	private _resize(): void {
		let innerWidth = window.innerWidth / 2
		let innerHeight = window.innerHeight;
		this.camera.aspect = innerWidth / innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(innerWidth, innerHeight);
	}


	public setAngryExpression(value: number) {
		this.face.morphTargetInfluences[0] = value
	}

	public setSurprisedExpression(value: number) {
		this.face.morphTargetInfluences[1] = value
	}

	public setSadExpression(value: number) {
		this.face.morphTargetInfluences[2] = value
	}

	public setState(name: string) {
		this.api.state = name;
	}

	public executeState(name: string) {
		this.api.state = name;
		this._fadeToAction(name, 0.2)
	}

	public executeEmotes(name: string) {
		this._fadeToAction(name, 0.2)
	}

	private _restoreState() {
		this._fadeToAction(this.api.state, 0.2);
	}

	private _fadeToAction(name: string, duration: number) {
		this.previousAction = this.activeAction;
		this.activeAction = this.actions[name];
		if (this.previousAction !== this.activeAction)
			this.previousAction.fadeOut(duration);
		else return
		this.activeAction
			.reset()
			.setEffectiveTimeScale(1)
			.setEffectiveWeight(1)
			.fadeIn(duration)
			.play();
	}

	public setFaceExpression(value: any) {
		if (!value) return
		this.setSadExpression(value['sad'])
		this.setSurprisedExpression(value['surprised'])
		this.setAngryExpression(value['angry'])
	}
}
