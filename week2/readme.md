
[Project hosted live here](https://aaksin.github.io/connectionsLab/week2/index.html)

It has click interactions - 
- play/pause button
- click on the progress bar to take you to a certain part of the song
- same as above with volume bar

It has keyboard interactions - 
- press spacebar to play/pause
- use up/down arrow to keys to control the volume

# Planning
<p float="left">
<img src="https://i.imgur.com/38ER7qa.jpg" width="500" alt="wireframe-1"/>
<img src="https://i.imgur.com/3F9BLYe.jpg" width="500" alt="wireframe-2"/>
</p>

I decided to create a music player for this assignment as I am very intrigued by the interactions that go on in creating one (Spotify is one of my favouritely deisgned apps). It gives ample opportunity to include both click and keypress interactions. I drew 7-8 frames on paper, till I came up with a design I liked.

<img src="https://i.gyazo.com/3cc413a42256cbc4381ade13230447f3.gif" alt="Figma Proto" width="1000"/>

I then designed it out on Figma. Here's the link to the [Figma Prototype](https://www.figma.com/file/MyYTmjIHtvi3wW6aezsteG/Music-Player?node-id=2%3A43). There were 2 versions I went through before arriving on this one. I tried it out with various different album covers.

# Coding
The HTML, CSS part was fairly simple. I used flexbox mainly for the positions. For the Javascript, I learnt about the HTML audio tag and used MDN to find more info about it's attributes. I also looked up resources online about creating a music player and how to control certain attributes. 

**Note**: The rationale behind using IDs in many places instead of classes was that a lot of the elements on the page were unique. The styling or javascript being applied to them could not possibly be re-used. To emphasise that nature + make javascript simpler I decided to use IDs wherever suitable.

# Learning

I learnt how to use MDN better. I learnt more about the HTML audio tag. I learnt more about Figma Animations.

# Todo
- left and right arrow will make song go back and forth
- add mute button functionality (clicking on volume button mutes it and the volume button changes to volume with a cut)
- make the previous and next work + add more songs
- make an animation of swiping between the songs
- make favicon
- shift all assignments from class including this to personal site
- add lyrics
