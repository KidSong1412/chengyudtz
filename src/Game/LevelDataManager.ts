class LevelDataManager {
	private items: LevelDataItem[] = [];

	private static shared: LevelDataManager;
	public static Shared(): LevelDataManager {
		if (LevelDataManager.shared == null) {
			LevelDataManager.shared = new LevelDataManager();
		}
		return LevelDataManager.shared;
	}

	public constructor() {
		this.items = RES.getRes("questions_json");
	}

	//通关后获取数据
	public getLevel(level: number): LevelDataItem {
		if (level < 0) {
			level = 0;
		}
		if (level >= this.items.length) {
			level = this.items.length - 1;
		}
		return this.items[level];
	}

	public get Milestone(): number {
		var milestone = egret.localStorage.getItem('guessWord');
		if (milestone == '' || milestone == null) {
			milestone = '1';
		}
		return parseInt(milestone);
	}
	public set Milestone(val: number) {
		egret.localStorage.setItem('guessWord', val.toString());
	} 
}

class LevelDataItem {
	public answer: string;
	public img: string;
	public word: string;
	public tip: string;
	public content: string;
}