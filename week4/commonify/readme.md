Hosted live at [https://commonify.herokuapp.com/](https://commonify.herokuapp.com/)



# Inspiration & Influences

<img src="https://i.imgur.com/rjdIo9M.jpg" width=500> <img src="https://i.imgur.com/YeEPD85.jpg" width=500>

The idea was to build on top of my project for the previous week - [a music player](https://aaksin.github.io/connectionsLab/week2). I have expanded on the various concepts I thought up of in the Decisions part below. The inspiration mainly was to work with any sort of musical data and present it in an engaging way.

<img src="https://musictech.com/wp-content/uploads/2021/12/Spotify-Wrapped-2021@2000x1500.jpg" alt="Spotify Wrapped"> One of my influences was Spotify Wrapped as well. I really like how they represent a lot of data in a very fresh, clean, fun and colorful format. 

# Description - App Flow

<img src="https://i.imgur.com/4EImHwG.png" alt="app screenshot">

There are 2 buttons on top which say Login User A and Login User B. Two Users click on them seperately and login into their Spotify accounts. My Express server handles their OAuth tokens and passes a request to the Spotify API to get each of their top 50 artists.

https://github.com/AakSin/connectionsLab/blob/cdd778eae9877d731c6e309a99b942eccdc5260f/week4/commonify/app.js#L79-L110

These are written into a JSON file then. Then the file called content.js fetches this json and generates the visualizations from it. The visualizations are randomly placed color coded circles. The colors are red, blue and purple. Red and blue for the respective users and purple represnting their common arists. The bubbles get smaller in size as the ranking of the artists decreases. The user can hover over the bubble to get the name and click to open the spotify page of that artist.

# Decisions
## Conceptual - Ideas & Sketches

<img src="https://i.gyazo.com/3cc413a42256cbc4381ade13230447f3.gif" alt="Music Player Figma Proto" width="1000"/>

I first started out with the idea of music visualization. I was planning on my dataset to be the song's amplitudes or frequencies and then using that to create various visualizations for the current song playing. Then I shifted to the idea of using some API like Spotify's to gather data about the current song playing. For example, I thought of displaying album data, song lyrics, artist info etc. for the current song playing. While playing around with the API, I came across a method to fetch top 50 artists or tracks of an user. I then decided upon the idea of displaying the top artists of 2 users and then creating some visualizations for the common one.

## Creative - Prototype & Sketches
I started developing my idea on Figma. [Link to the figma prototype](https://www.figma.com/file/w42vFwdQGQASPpFy0GnnuW/Connections-Lab-Project-1?node-id=0%3A1).

<a href="https://gyazo.com/021166cf8937ab23490ff5d1c20d015e"><img src="https://i.gyazo.com/021166cf8937ab23490ff5d1c20d015e.gif" alt="Image from Gyazo" width="1000"/></a>

I was very confused for a long time as to what the best way to represent common artists between 2 users was. I came up with several iterations involving lines connecting circles, numbers represting ranks besides circles and finally color coded circles. I conducted a lot of user research - basically asking my friends what they think is the best design out of all these. A lot of people said the color coded one was the cleanest design of them all and I should go with that. I had hesitations about it as it was a bit ambiguous as to what the colors represent, but I decided to not delay the coding any further and went with it.

## Technical - Frameworks & Code

- I chose to go with the decision of creating an actual backend server rather than a simple fetch sequence because of Spotify's OAuth2 token grabbing process. I had to handle multiple routes one after another and I decided a node.js + express backend server would be the best for it. Here's the flowchard for Spotify's OAuth2 Flow. 

<img src="https://developer.spotify.com/assets/AuthG_AuthoriztionCode.png" width=1000>

https://github.com/AakSin/connectionsLab/blob/cdd778eae9877d731c6e309a99b942eccdc5260f/week4/commonify/app.js#L62-L89

- The aritst bubbles for generating the data visualizations were chosen to be made objects for the ease of development. They held a lot of data + performed a lot of actions and hence I thought using OOP would be the way to go for this project. Initially I had started with generating ellipses using p5.js in the loop itself but soon realized how ineffienct that was.

https://github.com/AakSin/connectionsLab/blob/cdd778eae9877d731c6e309a99b942eccdc5260f/week4/commonify/public/content.js#L180-L220

# Challenges - and their Solutions

- I have worked with OAuth before but I have always used libraries or wrappers for it before. As using a pre-built library would be technically violating the assignnment + I really wanted to learn working with raw OAuth tokens too, I decided to set up my own Express server. I created routes based on the [Spotify Developer API](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/). I was stuck on this part for a long time and had to watch a lot of tutorials to finally learn how to get a user's OAuth2 token.

- Placing circles randomly on a canvas without them overlapping was another huge challenge. I tried solving it on my own for quite some time - my attempts involved keeping track of every circle's center and radius, and then blacklisting all the points as invalid which fall in that range. I shifted to solution online though after I wasn't able to implement it this way. I found Dan Shiffman's video on this (Linked at the end), which helped me come up with a bubble packing algorithm.

https://github.com/AakSin/connectionsLab/blob/cdd778eae9877d731c6e309a99b942eccdc5260f/week4/commonify/public/content.js#L122-L164

- Placing images inside a circle was deceptively simple too. I tried looking for inbuilt p5 options like fillImage or something initially but was surprised to find none. I found about 2 solutions - masks and webGl textures. I struggled with the former a lot on my own and was thinking of shifting to the latter when Professor Mathura shared a code snippet with me, that helped me solve my issue. Her code snippet has been linked in the end.

https://github.com/AakSin/connectionsLab/blob/cdd778eae9877d731c6e309a99b942eccdc5260f/week4/commonify/public/content.js#L191-L207

- Another issue I ran into was that the p5.js code kept on being executed before the fetch or the algorithm had it generated. I didn't run into this issue on localhost because my machine was doing it before the p5.js code was exectued but on the Heroku server I kept on running into this. The professor suggested I set up flags for this issue. That is what I did and that did help me. Sometimes the second fetch would complete before the first one and for that I decided to nest the second fetch inside the first one. 

https://github.com/AakSin/connectionsLab/blob/cdd778eae9877d731c6e309a99b942eccdc5260f/week4/commonify/public/content.js#L12-L26


  
# Future Plans
  
  I'd like to add a drop down menu which would let the user select between the time ranges instead of the default medium one right now.
  
  I am still confused about how I will be doing the visualizations. I might switch my dataset too since I can now easily access the spotify API. 
  
  Either the visualizations will be based on the Figma Prototype linked above or I might take top tracks of a user and embed small music players for them. I am still deciding ways to integrate this with my music player too. One of the plans is to combine this with my music player and when a user clicks on artist, the 30 second spotify song demo of that artist starts playing on my music player.
  
  If I chose to stick with something similar to Figma, the artists will be represnted as small circles and lines will be drawn between the common ones. I talked to a friend who was good at UI and she recommended that I only display the common artists. That is something to consider too.
  
  

