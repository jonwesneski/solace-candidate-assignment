- I wanted to make the search for advocates a POST because I feel it will get more complicated in the future. And it is hard to support that in GET requests.
- Also created some types to help with type saftey
- 
- Since we can have tens of thousands of records here, I want to limit the amount that is retrieved. I implemented a pagination feature for this.
- Being able to scroll and having data being fetched in the background at a certin point is a nice UX. The certain point is the 3rd to the last row. Once it gets to this point and there are more pages, it will do another fetch.
- I make the 1st request in an SSR component so I improve the initial load time.
- I moved the fetching api to a reuseable hook in case it does get reused
- I created some folders to organize this new feature. It is a lot of setup just for supporting the new API feature
-
- I separated each react components into smaller piece so that will not cause as many re-renders. The approach I took is Feature -> List -> Card; so 3 components.
- I kept the design rather simple as I am running out of time, but I used a little bit of css and got rid of the table, because I wanted to have the top part fixed.
-
- I had an issue with the syntax for querying the db with drizzle. I haven't used it before, I spent a little time debugging but didn't want it to be take all of my time so I left it the way it is. It still grabs data from the static file.
- Some things I would have liked to still achieve:
 1. make a better card to display the data. Rather than having a grid, I would like the Card to be in 1 div, and inside that position the data where name, city, degree, years of experience would be on the top left. Then I would have a long vertical section at the bottom for specialities since that can take up most a lot of vertical. I would have the remaining data towards the top right. I would format the phone number as well: "(123) 456-7890"
 2. Have some eslinting rules and add some vscode settings to help with formatting
 3. Make the search bar more visually appealing
 4. I want to sort by "years of experience" and name
 5. Filter specialties by a multi-dropdown box to make it easier
 6. Add a debouncer on user input so we don't make api calls so quickly after each keyboard press