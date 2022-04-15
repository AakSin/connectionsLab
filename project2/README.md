## April 4 | Symphonizer
[Website](https://symphonizer2.glitch.me) and [glitch repo](https://glitch.com/edit/#!/symphonizer2).

### Idea
Building on Marta’s socket.io app, for out project 2 we want to create a digital web-based instrument that produce sound on the key press. We would like to extend the sound library and include subtle animations coded with P5.js. [Patatap Website](https://patatap.com) serves as our main inspiration for this project. We would like to add the functionality of rooms with a maximum of 2 people and an unlimited number of observers, so that music can be composed without unnecessary interactions from many users. We would also like to expand the audiovisual options, allowing the user to choose from a calm (forest/jazz) or more lively (fire/metalic) symphony.


### Backend
We have agreed on the general feel of our application, designed a prototype of it in figma and sketched a general flow between the `client` and `server`.

![img](https://github.com/martapienkosz/symphonizer/raw/main/dcmd/sketch.png)

We have started off with the general set up for sockets. Later Aakarsh has been working on the logic behind the rooms.

**Join/Create**

When the user selects the settings in the home page and clicks on the create button, a create room event is emitted with the information about the room as data. Then in the backend, a new entry is created in the database with those settings. The ID of that entry in the database becomes the room code of that room.

In the home page, the join is a simple redirect. When you reach the link which is of the format `symphonizer2.glitch.me/roomCode` is where the actual logic starts taking place. The front end slices the roomcode out from the link and then sends it to the back end. The back end then verifies if this room exists or not. If it doesn't, then it sends an invalid room event back to our client. If it does, then the count of the room player goes up by 1 and our client gets information about the room like what it's settings are.

**Gameplay**

When a client clicks a button in the room, the keycode gets emitted to all the clients (including the sender) in that room. Upon receving this event, every client renders the animation and the sound.

**User Limiting**
There is a constant variable at the top of the index.js file which decides how many players max are allowed in one room. We use that every 
time a person joins a room. If they exceed the max player count, then they are given the role of spectator. If not, then the role of player.
The animations simply don't render on front end if the user has a class of spectator. They can just see all the other players perform.


### Animations

At the same time, Marta was working on the animations. She created an `effects.js` file with 3 different color palettes (ignis, aqua, terra) and 12 classes with animations. The architecture of each class has been built around the model below. Each class includes a `this.state` parameter which removes the animation upon the fade out.s. It helped us optimize the website.

```
class animationName {
  constructor(colorPallete) {
    if (colorPallete == "fire") {
      this.color = fireColor[Math.floor(Math.random() * fireColor.length)];
    } else if (colorPallete == "earth") {...}
    this.sth = ...
  }
  play() {...}
}
```

![img](https://github.com/martapienkosz/symphonizer/blob/main/dcmd/aqua2.png)

Each class was called on the specific `keyPressed` function. We split the 12 animations into 3 visual paths, giving each mode its own distinct feel.

```
socket.on("keyPressed", (data) => {
  if (visuals == "fire") {
    switch (data) {
      case 81:
        effects.push(new animationName());
        break;
      case 87:
        ....
    }
  }
```


### Audio

Aakarsh has composed 3 libraries of sounds, each of which contains 6 notes. We have settled on the futuristic, sanguine and orchestral modes and preloaded the soundtracks so there were no unnecessary delay.

The sounds were assembled from various drum packs and MIDI kits Aakarsh had in his computer already.
The drums are mainly chops from samples Aakarsh had lying around in his computer from previous music project. 
The piano, synthesizers, organs etc. were composed in FL Studio using the Serum plugin.

<img src="https://i.imgur.com/MOBZJp6.png">


### Frontend

Lastly, Marta was working on the frontend. We wanted the `menu` section to be super intuitive, allowing users to quickly get to the` playground` page. We divided the window into `create a room` and `join the room` sections. During testing, we asked a few users if they would prefer to name their room or just get a random code. Users had no preference, and after looking at games like Scribble and Kahoot we have settled on choosing an authentic, randomly generated room ID.

![img](https://github.com/martapienkosz/symphonizer/blob/main/dcmd/front2.png)

We also wanted to implement subtle `radio buttons` on the `playground` page that would allow users to switch modes while in the room. I think we did a great job with the design giving users extra options while not distracting them from the main animations.

![img](https://github.com/martapienkosz/symphonizer/blob/main/dcmd/front3.png)


```
socket.on("changeVisuals", (dataVisuals) => {
  document.querySelector(`input[name="visuals"][value=${dataVisuals}]`).checked = true;
  visuals = dataVisuals;
});
```


### Learnings
Marta's learnings
- Getting familar with p5.js, animations and concepts of classes
- Designing homepage with radio buttons, input box, unever number of text & content
- Communication and collboration (github & glitch / sharing code / meeting up / settling on idea)

Aakarsh's learnings
- I learnt how to work with NEDB
- I learnt how to execute a lot of events with sockets + stuff like broadcasting and rooms as well
- I learnt code optimization, the idea of making the effects a seperate class file with their own states was something which I really liked
- I got better with using music samples
- All in all, the experience of creating a cohesive multiplayer environment was something which I didn't think I'd be able to do but everything
from slicing the roomCode from address bar to making people spectators made me realize I had created a very usable multiplayer app.

(The plan is to even ship it out on a symphonizer.io domain in the future)


And here is a snapshot from the showcase!
![img](https://github.com/martapienkosz/symphonizer/blob/main/dcmd/showcase.png)
