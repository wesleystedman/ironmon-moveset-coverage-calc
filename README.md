# Ironmon Moveset Coverage Calculator

A Pokemon moveset coverage calculator designed to be used by players of the Ironmon Challenge.

The [Ironmon Challenge](https://pastebin.com/L48bttfz), created by Twitch streamer [iateyourpie](https://twitch.tv/iateyourpie), is a very difficult set of self-imposed rules for playing a [randomized](https://github.com/Ajarmar/universal-pokemon-randomizer-zx) Pokemon game.

### What makes this calculator better for Ironmon (and other randomized playthroughs) than other calculators?

- The version select limits the results to only Pokemon species and formes that other trainers can be given by the randomizer, reducing clutter and visual noise while also giving correct and relevant numbers in the results summary.

- The version select also ensures that the correct type effectiveness table, pokemon types, and evolution statuses are loaded for the selected game.

- The "Show only fully evolved Pokemon" setting allows the user to limit results to only Pokemon species and forms that they will see if they use the "force fully evolved at level X" randomizer setting.  While this setting is only required for the hardest difficulty level of Ironmon, it is popular to use with other difficulty levels for the added challenge and 'realism'.  High level trainers should evolve their pokemon after all, right?

## Getting Started

The calculator is hosted using GitHub Pages at https://wesleystedman.github.io/ironmon-moveset-coverage-calc/

### Usage Instructions
1. Select a version from the dropdown.
2. Check boxes for the types of moves your Pokemon knows.
3. Optional: If you're playing with the "force fully evolved at level X" option enabled in the randomizer, you can check the "Show only fully evolved Pokemon" box to limit the output to only Pokemon that you can encounter after the level requirement is reached.
   - Note that due to how the randomizer implements this option, not all Pokemon will appear at the same rate.
4. Click the "Calculate" button to show updated results.

## Technologies Used

- React
- Create-React-App
- [pokedex-promise-v2](https://github.com/PokeAPI/pokedex-promise-v2) v4.0.0
  - Used in setup-data.js to get Pokemon data from [pokeapi.co](https://pokeapi.co).
  - Notably, because this version is pure ESM, it's not really compatible with Create-React-App.  In hindsight, I should have used an older version.
- [gh-pages](https://www.npmjs.com/package/gh-pages)
- and the usual suspects, HTML, CSS, and JavaScript
