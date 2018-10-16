## Time zone Tables

Goal of this project is to create a small web app that provides an easy way to answer the question

"When it is time T in location X, what time will it be in location Y"

(for example when it is 8am in London, what is the time in Australia?)

Also want to make the app work without an internet connection (via service workers)

### Status

project is a work in progress and many things won't work.

### Naming conventions

have adopted a few naming conventions for the code, these being

- prefix types representing redux actions with "A"
- suffix Redux Container Components with "RCC"
- to avoid confusion with the lodash library, "wotev" rather than "_" is used to denote an unused/irrelevant parameter

### Roadmap

Current todos

1) Remember user selections across visits (i.e. save redux state in browser cache)
2) Allow user to choose ordering of columns and which is the base timezone
3) Make the table prettier