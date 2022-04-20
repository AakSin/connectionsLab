# Seigfried Visualizer

# Planning, Conceptions, Ideas

I was looking around the libraries we had to create this project with. I looked into ml5.js a lot first becaues I planned on using that. I realized for the 
kind of projects I wanted to create, I'd have to collect my own data and train my own model. I shifted my focus to three.js then as 3D visuals is something that has intrigued me for a long time. I have struggled with webGL in the past but really wanted to create something great this time. I looked around for ideas till I shifted my focus to the song I was listening at that time. It was <a href="https://www.youtube.com/watch?v=RWgpBlz16-s"> Seigfried by Frank Ocean. </a>

It came to me then. A video I had seen 3 years ago. It was my first introduction to Frank Ocean and I still remember it vivdly. It used Seigfried as its audio and Akira, a 1988 Japanese Cult Classic. The essence of Akira in the city of Neo-Tokyo. It is a city that is alive and dead at the same time. Capitalism and consumerism has taken it's toll on it. There is bright adverts and lights but the city speaks of desolation when you listen to it carefully. My aim was to create a similar world.

I set out on a journey on SketchFab to find a model most closest to my vision. I stumbled on three of them - the one <a href="https://sketchfab.com/3d-models/virtual-city-tilt-brush-5ab3706b14194516bf695add2d9cb9c0"> I am currently using </a>, <a href="https://sketchfab.com/3d-models/san-francisco-city-108841754fd3485886c1dde13301d341" > a model of San Fransisco </a> and <a href="https://sketchfab.com/3d-models/sci-fi-city-public-domain-b353532235bb4c45afeac578187c9be1" >another cybperpunk city model </a>. I liked this one the most and started testing it out with screenshots on Figma. 

<img src="https://i.imgur.com/rcq9I4J.jpg">

Here's a figma prototype

<img src="https://i.imgur.com/urIQVVd.png">

# Coding, Creation, Process, Challenges

Getting three.js going in the first place was an hassle. When I solved that, loading the model in was another challenge. When I finally loaded the model I realized it looked nothing like the pictures above. I thought, I had been scammed. 

<img src="https://i.imgur.com/K5QcZsP.png">

It just needed lighting, post-prodction and wireframing for it to start looking good though. Fixing the lighting was the biggest challenge for me since my experience with 3D has been more on the lines of sculpting. Leo Al-Ajab, another NYUAD student, helped me a lot in this process since she had more experience in 3D. I played around with all the lights three.js offers before finally fixing on Spotlights. A purple spotlight at top, a blue and red spotlight to the left and right. It still looked different. I realized it was missing a glow. I couldn't figure that out for the longest time, till I saw a postprocessing section on the three.js site. The effect of bloom which is basically glow, helped me out. It still looked off.

<img src="https://i.imgur.com/4RpgXXz.png">

I realized it still looked different from the artist's render. I asked <a href="https://jasoncruz.co/"> Jason Cruz </a>, another NYUAD student, as to how the final render had blue lines. Jason has a lot of experience in 3D stuff. He told me to try to find a way to enable wireframes in the code. After I enbaled, wireframes in my render, it finally came in together beautifully.

<img src="https://i.imgur.com/9mwqXAG.png">
<video src="https://i.imgur.com/lUhp495.mp4">

I then took some code from the project I made in week 2 - the music player - and implemented it on top of this to create an immersive rabbit hole of sound, color and shapes. 

# Learnings, To-Do

I finally feel like I have a more solid grasp on three.js / webGL or even 3D stuff in general.

I also managed to include lyrics in, as I promised in second week of classes when I made the music player.

## To-Do

- The  artist's render in my opinion stil has some more polishing than my render. While, I like the direction I have gone in with my own play on the lighting I still would like to imbue some elements from the artist's render as well. His reflections are pristine, while I feel mine lack a certain clarity. Also, the buildings look better on closer inspection in his render, meanwhile mine they fall apart on zooming in.
- I would have liked to edit the audio to have more reverb, delay and sort of create a more transcendetal effect for the audience
- I would have liked to add more interactions than simple panning and zooming for now. Maybe a way to speed up the camera, change the lighting, change the song, change the model etc.
- The song player's inteface itself could have perhaps been more minimialist or even innovative. Some of the ideas I would have implemented if I had more time would have involed making the music player a part of the render itself (still not sure how I would have accessed clicking on it then), maybe make it veritcal etc.

# Credit

Credits to FactoryFifteen for their model

<a href="https://sketchfab.com/3d-models/virtual-city-tilt-brush-5ab3706b14194516bf695add2d9cb9c0">https://sketchfab.com/3d-models/virtual-city-tilt-brush-5ab3706b14194516bf695add2d9cb9c0 </a>
