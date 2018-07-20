const fs = require('fs');
const { promisify } = require('util');
const webshot = require('webshot');

fs.readFilePromise = promisify(fs.readFile);

class EmojiMaker {
  static snap(html, left, top) {
    return new Promise((resolve) => {
      let chunks = [];
      
      const webshotStream = webshot(html, null, {
        siteType: 'html',
        shotSize: {
          width: 160,
          height: 160,
        },
        shotOffset: {
          left,
          top,
        },
        windowSize: {
          width: 200,
          height: 400,
        },
      });

      webshotStream.on('data', chunk => chunks.push(chunk));

      webshotStream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  constructor() {
    this.html = fs.readFileSync(__dirname + '/assets/emoji.html', { encoding: 'utf8' });
  }

  async createEmoji(text) {
    if (!this.html) return;
    const fixedText = text.replace(/\n/, '<br />');
    const html = this.html.replace(/(%EMOJI%)/g, fixedText);

    const [red, blue] = await Promise.all([
      EmojiMaker.snap(html, 20, 20),
      EmojiMaker.snap(html, 20, 200),
    ]);

    return { red, blue };
  }
}

module.exports = EmojiMaker;
