class SoundManager {
	private click_sound: egret.Sound;
	private word_sound: egret.Sound;
	private win_sound: egret.Sound;
	private wrong_sound: egret.Sound;
	private bgm_sound: egret.Sound;
	private bgm_channel: egret.SoundChannel;

	private static shared: SoundManager;
	public static Shared(): SoundManager {
		if (SoundManager.shared == null) {
			SoundManager.shared = new SoundManager();
		}
		return SoundManager.shared;
	}

	public constructor() {
		this.click_sound = RES.getRes('buttonclick_mp3');
		this.word_sound = RES.getRes('type_word_mp3');
		this.bgm_sound = RES.getRes('Music_mp3');
		this.win_sound = RES.getRes('right_mp3');
		this.wrong_sound = RES.getRes('wrong_mp3');
	}

	public playBgm() {
		if (this.bgm_sound && this.isMusic) {
			this.bgm_channel = this.bgm_sound.play(0,0);
		}
	}

	public stopBgm() {
		if(this.bgm_channel) {
			this.bgm_channel.stop();
		}
	}

	public playClick() {
		if (this.isSound && this.click_sound) {
			this.click_sound.play(0,1);
		}
	}

	public playRight() {
		if(this.isSound && this.win_sound) {
			this.win_sound.play(0, 1);
		}
	}

	public playWrong() {
		if(this.isSound && this.wrong_sound) {
			this.wrong_sound.play(0,1);
		}
	}

	public playWord() {
		if (this.isSound && this.word_sound) {
			this.word_sound.play(0, 1);
		}
	}

	public set isMusic(val) {
		if (val) {
			egret.localStorage.setItem('isMusic', "1");
			this.playBgm();
		} else {
			egret.localStorage.setItem('isMusic', "0");
			this.stopBgm();
		}
	}

	public get isMusic() {
		var b = egret.localStorage.getItem('isMusic');
		if (b == null || b == "") {
			return true;
		} else {
			return b == "1";
		}
	}

	public set isSound(val) {
		if (val) {
			egret.localStorage.setItem('isSound', "1");
		} else {
			egret.localStorage.setItem('isSound', "0");
		}
	}

	public get isSound() {
		var b = egret.localStorage.getItem('isSound');
		if (b == null || b == "") {
			return true;
		} else {
			return b == "1";
		}
	}
}