class SenceBegin extends eui.Component implements  eui.UIComponent {

	public btn_begin:eui.Button;
	public btn_setting:eui.Button;

	//单例声明
	private static shared: SenceBegin;
	public static Shared(): SenceBegin {
		if (SenceBegin.shared == null) {
			SenceBegin.shared = new SenceBegin();
		}
		return SenceBegin.shared;
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
		this.btn_setting.addEventListener(egret.TouchEvent.TOUCH_TAP, this.setting_tap, this);
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, this.begin_tap, this);
		SoundManager.Shared().isMusic = true;
	}

	private setting_tap() {
		SoundManager.Shared().playClick();
		this.addChild(GameSetting.Shared());
	}

	private begin_tap() {
		SoundManager.Shared().playClick();
		this.parent.addChild(SenceLevels.Shared());
		this.parent.removeChild(this);
	}
}