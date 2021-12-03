class SenceGame extends eui.Component implements  eui.UIComponent {
	public btn_back:eui.Button;
	public img_question:eui.Image;
	public group_words:eui.Group;
	public group_answer:eui.Group;

	public group_win:eui.Group;
	public btn_next:eui.Button;
	public lb_explain:eui.Label;
	public lb_from:eui.Label;

	private levelIndex: number = 0;

	private static shared: SenceGame;
	public static Shared(): SenceGame {
		if (SenceGame.shared == null) {
			SenceGame.shared = new SenceGame();
		}
		return SenceGame.shared;
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
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapBackBtn, this);
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.next_tap, this);
	}

	public initLevel(level: number) {
		this.levelIndex = level;
		var levelData = LevelDataManager.Shared().getLevel(level);
		var words = levelData.answer + levelData.word;
		while(words.length == 10) {
			var i = Math.floor(Math.random()*400);
			if (i != level) {
				var temp = LevelDataManager.Shared().getLevel(i);
			}
			words += temp.answer + temp.word;
		}
		var wordList: string[] = [];
		for (var i: number = 0; i < words.length; i++) {
			wordList.push(words.charAt(i));
		}
		wordList = this.randomList(wordList);
		for (let i: number = 0; i < this.group_words.numChildren; i++) {
			let word = <Word>this.group_words.getChildAt(i);
			word.setWordText(wordList[i]);
			word.visible = true;
		}
		for (let i: number = 0; i < this.group_answer.numChildren; i++) {
			let gp_answer_item = <AnswerWord>this.group_answer.getChildAt(i);
			gp_answer_item.setSelectWord(null); 
			gp_answer_item.visible = true;
			gp_answer_item.SelectWord = null;
		}
		this.img_question.source = "resource/assets/data/" + levelData.img;
	}

	private randomList(arr: string[]): string[] {
		var array = [];
		while (arr.length > 0) {
			var i = Math.floor(Math.random()*arr.length);
			array.push(arr[i]);
			arr.splice(i, 1);
		}
		return array;
	}

	public word_click(word: Word) {
		SoundManager.Shared().playWord();
		var sel: AnswerWord = null;
		for (var i: number = 0; this.group_answer.numChildren; i++) {
			var answer = <AnswerWord>this.group_answer.getChildAt(i);
			if (answer.SelectWord == null) {
				sel = answer;
				break;
			}
		}
		if (sel) {
			sel.setSelectWord(word);
		}
		var check_str: string = "";
		for (var i: number = 0; i < this.group_answer.numChildren; i++) {
			var answer = <AnswerWord>this.group_answer.getChildAt(i);
			check_str += answer.getWordText();
		}
		if (check_str == LevelDataManager.Shared().getLevel(this.levelIndex).answer) {
			this.showWin();
		}
	}

	private showWin() {
		this.group_win.visible = true;
		var levelData = LevelDataManager.Shared().getLevel(this.levelIndex);
		this.lb_from.text = levelData.content;
		this.lb_explain.text = levelData.tip;
	}

	public onTapBackBtn() {
		SoundManager.Shared().playClick();
		this.parent.addChild(SenceLevels.Shared());
		this.parent.removeChild(this);
	}

	private next_tap() {
		SoundManager.Shared().playClick();
		this.group_win.visible = false;
		this.initLevel(this.levelIndex + 1);
		SenceLevels.Shared().setMileStoneLevel(this.levelIndex + 1);
	}
	
}