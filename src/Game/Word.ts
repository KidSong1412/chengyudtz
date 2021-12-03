class Word extends eui.Component implements  eui.UIComponent {
	public lb_text:eui.Label;

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
		this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.word_tap, this);
	}

	protected word_tap() {
		SenceGame.Shared().word_click(this);
	}

	public getWordText():string{
		return this.lb_text.text;
	}

	public setWordText(val:string){
		this.lb_text.text = val;
	}
	
}

class AnswerWord extends Word {
	public SelectWord: Word = null;
	public constructor() {
		super();
	}
	protected word_tap() {
		if (this.SelectWord) {
			this.setWordText("");
			this.SelectWord.visible = true;
			this.SelectWord = null;
		}
	}
	public setSelectWord (word: Word) {
		if (word) {
			word.visible = false;
			this.setWordText(word.getWordText());
		} else {
			this.setWordText("");
		}
		this.SelectWord = word;
	}
}