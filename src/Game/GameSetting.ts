class GameSetting extends eui.Component implements  eui.UIComponent {
	public btn_agree:eui.Button;
	public btn_music:eui.Button;
	public img_music_disable:eui.Image;
	public btn_sound:eui.Button;
	public img_sound_disable:eui.Image;

	private static shared: GameSetting;
	public static Shared(): GameSetting {
		if (GameSetting.shared == null) {
			GameSetting.shared = new GameSetting();
		}
		return GameSetting.shared;
	}

	public constructor() {
		super();
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
		this.init();
	}

	private init() {
		this.btn_agree.addEventListener(egret.TouchEvent.TOUCH_TAP, this.agree_tap, this);
		this.btn_music.addEventListener(egret.TouchEvent.TOUCH_TAP, this.music_tap, this);
		this.btn_sound.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sound_tap, this);
		this.update_button_stage();
	}

	private agree_tap() {
		this.parent.removeChild(this);
		SoundManager.Shared().playClick();
	}
	private music_tap() {
		SoundManager.Shared().playClick();
		SoundManager.Shared().isMusic = !SoundManager.Shared().isMusic;
		this.update_button_stage();
	}
	private sound_tap() {
		SoundManager.Shared().playClick();
		SoundManager.Shared().isSound = !SoundManager.Shared().isSound;
		this.update_button_stage();
	}
	
	private update_button_stage() {
		this.img_music_disable.visible = !SoundManager.Shared().isMusic;
		this.img_sound_disable.visible = !SoundManager.Shared().isSound;
	}
}