Project hosted live on: [https://genresearch.herokuapp.com/](https://genresearch.herokuapp.com/)

The website asks you to enter genres and then provides artist in that genre. You can click on read more for each artist to learn more about them, check their socials and preview a track.

# Planning

My intention was to again work with music data. I had been meaning to create something that helps people find artists in niche genres for a long time and I finally decided to
implement it here. I straigt away started with Figma as I had a clear idea of what I wanted to begin with - a main page for searching artists through genres and then a subpage for
each artist. [Link to the Fimga Prototype](https://www.figma.com/file/NQs5CCq3UmtQxy6icGfjX9/ConnLab-Week-5?node-id=0%3A1).
<img src="https://i.imgur.com/Uvlu8sW.png">
<img src="https://i.imgur.com/K0Wo7aY.png">

# Coding

The coding was a signifcant challenge this time around. I first started with creating the JSON file. I figured out what all data I'd need for my file - name,image, description, genres, 
social links and an embed. I then went ahead and collected all this data for 8 artists which was a long process.

https://github.com/AakSin/connectionsLab/blob/46115b9ea9a004c1faecf4ab24ff439d1b1300a2/week6/artists.json#L1-L32

Afer the JSON was done, I shifted my attention the backend. I figured I'd mainly need 2 paths - one to return artists of a genre, another to display info about a particular artists. 
I finished setting these routes up and the plan was to use this as an API, and fetching the data in front end and subsequently generating stuff through that. I soon realized that was
inefficient and I decided to use a temple engine. I chose EJS (Embedded Javascript) and through that I was efficiently able to pass the data from the back end straight into
the front end. The data was different each time but through the help of templates I was able to display it the way I wanted.

https://github.com/AakSin/connectionsLab/blob/46115b9ea9a004c1faecf4ab24ff439d1b1300a2/week6/views/main.ejs#L21-L43

Then I went to the styling i.e. CSS. As I had a Figma on hand to consult to, this was efficiently done.

# Learnings and Afterthoughts

I learnt how to use EJS through the help of this project. I have friends who are good at UI/UX and they have been telling me I have been getting better with my UI/UX
projects. They really liked the design for this project, whereas I have been told I usually overcomplicate the design process with multiple colors or fonts.

I had some struggles with creating the layout. I would like to try to use CSS grids in the future for a layout like this. I am not sure if that would make the process easier but it would be an
interesting process.

I also realized quite late that using VH (viewport height) for giving top/bottom margins is not a good idea and I should stick with pixels, ems, rems etc. While VW is a good value,
VH is sometimes not useful as a phone in vertical position and a small laptop have nearly the same viewport height.

# Todos

- Add more artists
- Make the website responsive (especially for phone)
- Change the VHs to pxs,ems or rems
- Make each artists page more symmetric (maybe group the embed and social links in one div and then veritcally center that div)
