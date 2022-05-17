# About Gooey Reader

![dashboard](https://user-images.githubusercontent.com/15249275/168856928-a1767d23-d524-48f1-b61f-bc42e305629b.jpg)

![unread-feed](https://user-images.githubusercontent.com/15249275/168856986-cd1137bc-53eb-496e-b7eb-2658f9785f7d.jpg)

Gooey Reader (aka GUI, Graphical User Interface...) is an RSS Reader web app designed to act as a playground for ideas, patterns and concepts.

It uses [Ruby on Rails](https://rubyonrails.org), with a [React](https://reactjs.org) front-end. However, unlike most other projects – it's not an SPA. Gooey uses [InertiaJS](https://inertiajs.com) to act as glue between to the two. Allowing the app to continue to use server-side routing and controllers.

It's development is driven by it's creator's whims (does an RSS Reader need a Dashboard? No, but I made one anyway). Sometimes I just want to play around in the front-end, sometimes I want to try something in the backend. So if elements seem over-refined compared to others that is probably why.

Some things I like / find interesting:

- It uses [Vite Ruby](https://vite-ruby.netlify.app) instead of Webpacker.
- It uses InertiaJS (as discussed above)
- It uses a result object pattern for returning service objects
- [Lefthook](https://github.com/evilmartians/lefthook) for pre-commit git hooks
- [Alba](https://github.com/okuramasafumi/alba) for generating serialized objects (finally leaving behind Active Model Serializers)
- [Cuprite](https://cuprite.rubycdp.com) for driving headless-Chrome
- It uses [HeadlessUI](https://headlessui.dev) to provide accessible, but visually customisable components like dropdowns and modals.
- Webmock and VCR for stubbing external API requests (super useful for creating feeds)
- Broadly, it's trying to retain a server-side approach, and limit the amount of front-end state while still feeling responsive like an API-driven SPA. This has worked better in some places than others.

### Rubocop

- Run `bundle exec rubocop --auto-gen-config` to generate a todo list of existing exceptions
- Run `rubocop -a` to autocorrect offenses
- Run `rubocop -x` to fix layout issues
