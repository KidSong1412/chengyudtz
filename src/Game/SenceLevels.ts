class SenceLevels extends eui.Component implements  eui.UIComponent {
	public btn_back:eui.Button;
	public sc_level:eui.Scroller;
	public group_levels:eui.Group;
	public img_arrow:eui.Image;

	private static shared: SenceLevels;
	public static Shared(): SenceLevels {
		if (SenceLevels.shared == null) {
			SenceLevels.shared = new SenceLevels();
		}
		return SenceLevels.shared;
	}

	//选中的关卡
	private sel_level: number = 0;
	//所有的关卡按钮
	private levelIcons: LevelIcon[] = [];

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
		this.sc_level.scrollPolicyH = eui.ScrollPolicy.OFF;
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back_tap, this);

		var row = 10;
		var col = 20;
		var spanX = this.width / row;
		var spanY = this.height / col;

		var group = new eui.Group();
		this.group_levels.addChild(group);
		group.width = this.width;
		group.height = spanY * 400;

		for (var i: number = 0; i < group.height / this.height; i++) {
			var img = new eui.Image();
			img.source = RES.getRes("GameBG2_jpg");
			img.y = i * this.height;
			img.touchEnabled = false;
			this.group_levels.addChildAt(img, 0);
		}

		var Milestone: number = LevelDataManager.Shared().Milestone;
		for (var i: number = 0; i < 400; i++) {
			var icon = new LevelIcon();
			group.addChild(icon);
			icon.Level = i + 1;
			icon.x = Math.sin(spanY*i/2/180*Math.PI)*200 + group.width/2;
			icon.y = group.height -  spanY * i - icon.height;
			icon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.icon_tap, this);
			icon.enabled = i < Milestone;
			this.levelIcons.push(icon);
		}
		this.group_levels.scrollV = group.height - this.height;
		if (Milestone > 20) {
			this.group_levels.scrollV = group.height - Milestone * spanY;
		}
		this.img_arrow.anchorOffsetX = this.img_arrow.width / 2;
		this.img_arrow.anchorOffsetY = this.img_arrow.height;
		this.img_arrow.touchEnabled = false;
		var currentIcon = group.getChildAt(Milestone - 1);
		this.img_arrow.x = currentIcon.x + currentIcon.width / 2;
		this.img_arrow.y = currentIcon.y;
		this.sel_level = Milestone;
		this.group_levels.addChild(this.img_arrow);
	}

	private back_tap() {
		SoundManager.Shared().playClick();
		this.parent.addChild(SenceBegin.Shared());
		this.parent.removeChild(this);
	}

	private icon_tap(e: egret.TouchEvent) {
		var icon = <LevelIcon>e.currentTarget;
		if (this.sel_level != icon.Level) {
			this.img_arrow.x = icon.x + icon.width / 2;
			this.img_arrow.y = icon.y;
			this.sel_level = icon.Level;
		} else {
			this.parent.addChild(SenceGame.Shared());
			this.parent.removeChild(this);
			SenceGame.Shared().initLevel(icon.Level - 1);
		}
	}

	public setMileStoneLevel(level: number) {
		var icon = this.levelIcons[level - 1];
		icon.enabled = true;
		this.img_arrow.x = icon.x + icon.width / 2;
		this.img_arrow.y = icon.y;
		if (level > LevelDataManager.Shared().Milestone) {
			LevelDataManager.Shared().Milestone = level;
		}
	}
	
}