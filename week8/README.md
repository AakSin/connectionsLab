# Description

Hosted live on <a href="https://socketshooter.herokuapp.com/"> https://socketshooter.herokuapp.com/ </a>

Player 1 controls - Left and Right Arrow key to move, space bar to shoot

Player 2 controls - A and D letters to move, shift to shoot

The ships move on the horizontal axis. The aim is to shoot down the other person's ship.


# Planning & Inspiration

The idea of the game came from various arcade space shootem-ups like _Space Invaders_ or _Spacewar!_ 

<img src="https://images.theconversation.com/files/221251/original/file-20180531-69508-1oenzpj.png?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip">
<img src="https://mobidictum.biz/wp-content/uploads/2021/11/spacewar-dogusu.gif">

I started looking for assets for 2 spaceships, particles and the space background. I found all these assets on <a href="itch.io">itch.io</a>. They have been linked in the end.

<img src="https://i.imgur.com/mAXmNdI.jpeg">
I sketched out the flow chart for the socket events.

# Process & Challenges

I first created the entire game in p5. Then I moved it to a public folder. Then I created an index.js server file where I setup the boilerplate for express and socket. Then upon certain keypress events like the shooting or movement, I set up the emit events.

https://github.com/AakSin/connectionsLab/blob/8c4e1468bd3b0c73ee27524b71ca907693ff2991/week8/public/spaceship.js#L19-L29

Then I set up receivers and emitters for each event on the server.

https://github.com/AakSin/connectionsLab/blob/8c4e1468bd3b0c73ee27524b71ca907693ff2991/week8/index.js#L22-L36

Then I set up receivers on the client side in the sketch.js file.

https://github.com/AakSin/connectionsLab/blob/8c4e1468bd3b0c73ee27524b71ca907693ff2991/week8/public/sketch.js#L25-L38

I encountered a lot of challenges in what data to transmit and how to use that transmitted data paritculary. One of my inital ideas was to transmit what
key was being pressed and then simulating the key presses using javascript on the other devices. I realized that wasn't a good idea and shifted to my current idea.

Another challenge was that initally I had set canvas height and width to window height and width. The game started being buggy when played on different viewports then and thus I decided to go for a fixed viewport.

# Learnings & To-Dos

This was my first time building something realtime. I have never worked with sockets in any way or form so it was pretty confusing doing a lot of the tasks. I am glad I was able to get a simple understanding of sockets through this project. The things I'd like to work on - 


- Add a title screen to the game explaining the controls
- Add music and sound effects to the game
- Maybe re-do the art yourself
- Fix bug wherein at times, it shows a win screen for one client but not for the other
  - Investigate if there are inconsistencies in health between 2 clients
