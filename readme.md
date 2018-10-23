## Time zone Tables

Goal of this project is to create a small web app that provides an easy way to answer the question

"When it is time T in location X, what time will it be in location Y"

(for example when it is 8am in London, what is the time in Australia?)

Also want to make the app work without an internet connection (via service workers)

### Status

project is somewhat of a work in progress but still somewhat usable

currently a deployment exists at https://optimistic-kare-227a66.netlify.com/ - this may move later

### Naming conventions

have adopted a few naming conventions for the code, these being

- prefix types representing redux actions with "A"
- suffix Redux Container Components with "RCC"
- to avoid confusion with the lodash library, "wotev" rather than "_" is used to denote an unused/irrelevant parameter

### Roadmap

Current todos

- Allow user to choose date (i.e. in case of daylight savings meaning the same place changes zone)
- Allow user to choose ordering of columns
- improve responsiveness on mobile by handling touch events rather than just simulated click
- refactor the code for the time zone display table to be more readable
- investigate why warning of non unique keys from selector
- More styling - in particular change table headers to indicate visually they can be clicked to set that column as the base time zone.

