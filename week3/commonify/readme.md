Hosted live at [https://commonify.herokuapp.com/](https://commonify.herokuapp.com/)

This site asks 2 people to log in to their spotify, compares their top 50 artists in a medium time range and then presents the common artists between them.

# Planning

<img src="https://i.imgur.com/rjdIo9M.jpg" width=500> <img src="https://i.imgur.com/YeEPD85.jpg" width=500>

The idea was to build on top of my project for the previous week - [a music player](https://aaksin.github.io/connectionsLab/week2). 


<img src="https://i.gyazo.com/3cc413a42256cbc4381ade13230447f3.gif" alt="Music Player Figma Proto" width="1000"/>

I first started out with the idea of music visualization. I was planning on my dataset to be the song's amplitudes or frequencies and then using that to create various visualizations for the current song playing. Then I shifted to the idea of using some API like Spotify's to gather data about the current song playing. For example, I thought of displaying album data, song lyrics, artist info etc. for the current song playing. While playing around with the API, I came across a method to fetch top 50 artists or tracks of an user. I then decided upon the idea of displaying the top artists of 2 users and then creating some visualizations for the common one.

I started developing my idea on Figma. Apologies for the low fidelity demo, as I was just experimentening with the structure I'd represnt the data as. [Link to the figma prototype](https://www.figma.com/file/w42vFwdQGQASPpFy0GnnuW/Connections-Lab-Project-1?node-id=0%3A1).

<img src="https://i.gyazo.com/b956c081782927c753354e2c722cb954.gif" alt="Spotify Connect Figma Proto" width="1000">

# Coding

There were a lot of challenges in the coding part. I have worked with OAuth before but I have always used libraries or wrappers for it before. As using a pre-built library would be technically violating the assignnment + I really wanted to learn working with raw OAuth tokens too, I decided to set up my own Express server. I create routes based on the Spotify Developer API (backedn created using Node + Express). The [flow of Spotify's OAuth token](https://developer.spotify.com/documentation/general/guides/authorization/code-flow/) was very complicated which is where I was stuck for a long time.

<img src="https://developer.spotify.com/assets/AuthG_AuthoriztionCode.png" width=1000>

After fetching the OAuth token for a user, I send out a request to get their top 50 artists in a medium time range. I then save it to a JSON file. The JSON file is read by the file called content.js which currently generates li elements with the artist name + image for each of the top 50 artists. Visualizations will be done with this file later on.
  
# Future Plans
  
  I'd like to add a drop down menu which would let the user select between the time ranges instead of the default medium one right now.
  
  I am still confused about how I will be doing the visualizations. I might switch my dataset too since I can now easily access the spotify API. 
  
  Either the visualizations will be based on the Figma Prototype linked above or I might take top tracks of a user and embed small music players for them. I am still deciding ways to integrate this with my music player too. One of the plans is to combine this with my music player and when a user clicks on artist, the 30 second spotify song demo of that artist starts playing on my music player.
  
  If I chose to stick with something similar to Figma, the artists will be represnted as small circles and lines will be drawn between the common ones. I talked to a friend who was good at UI and she recommended that I only display the common artists. That is something to consider too.
  
  

