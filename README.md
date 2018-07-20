# EmojiMaker


<img src="https://user-images.githubusercontent.com/6262514/42980039-4c255584-8b8a-11e8-975c-df01ba2c93c7.png" width="80px" height="80px" />   <img src="https://user-images.githubusercontent.com/6262514/42980038-4c102eac-8b8a-11e8-91d9-3d37636d2585.png" width="80px" height="80px" />

Simple square emoji maker

# Table of Contents

1.  [Installation](#installation)
1.  [Usage](#usage)

## Installation

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
$ npm install andydam/EmojiMaker
```

## Usage

The method `.createEmoji` returns a Promise that resolves with an object containing two buffers, `red` and `blue`.

```js
const fs = require('fs');
const EmojiMaker = require('andydam/EmojiMaker');

maker = new EmojiMaker();

maker.createEmoji('SELL\nSELL\nSELL').then(({red, blue}) => {
  fs.writeFileSync('red.png', red);
  fs.writeFileSync('blue.png', blue);
});
```