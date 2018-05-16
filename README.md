# Active Monitoring

## Dockerized development

To get started checkout the project, then execute `./dev-setup.sh`

To run the app: `docker-compose up`

Now you can visit [`app.activemonitoring.local.test`](app.activemonitoring.local.test) from your browser.

To open a shell in a container: `docker exec -it activemonitoring_db_1 bash`, where `activemonitoring_db_1` is a container name. You can list containers with `docker ps`.

To start an Elixir console in your running Phoenix app container: `docker exec -it activemonitoring_app_1 iex -S mix`.

To run the tests: `docker exec -it activemonitoring_app_1 mix test` or `docker-compose run app mix test`

To run the JS linter: `docker-compose run webpack yarn lint`

To run the migrations: `docker-compose run app mix ecto.migrate`

## Exposing your containers as *.activemonitoring.local.test

You can use [dockerdev](https://github.com/waj/dockerdev) to access the web app at `app.activemonitoring.local.test` and ngrok at `ngrok.activemonitoring.local.test`.

Just follow the instructions at the README of dockerdev.

## Developing with local GUISSO & Verboice

The easiest path to using a local Verboice instance is to use a local GUISSO too. Start by running a local GUISSO via `docker-compose up` in that project - you should be able to browse http://web.guisso.local.test/ then.

Register both ActiveMonitoring and Verboice there as new, trusted applications. Use `app.activemonitoring.dev` and `web.verboice.local.test` as hostnames. Edit the `ActiveMonitoring` app and fill the `Redirect uris` field with the following URIs:

 - `http://app.activemonitoring.local.test/oauth_callback`
 - `http://app.activemonitoring.local.test/oauth_client/callback`
 - `http://app.activemonitoring.local.test/session/oauth_callback`

Edit the Verboice GUISSO app and replace the `guisso.yml` from Verboice working directory. Then run Verboice.

Create `config/local.exs` with the following structure and set up your config variables:

```

use Mix.Config

config :active_monitoring, :verboice,
  base_url: "",
  guisso: [
    base_url: "",
    client_id: "",
    client_secret: "",
    app_id: ""
  ]

config :active_monitoring, :guisso,
  base_url: "",
  auth_url: "",
  token_url: "",
  redirect_uri: "",
  client_id: "",
  client_secret: ""

```

## Coherence

### Upgrading

We're using Coherence to support registration, authorization, and other user management flows.
If you need to upgrade the version of Coherence that Ask uses, there are some steps that you need to mind.
Please check them out here: https://github.com/smpallen99/coherence#upgrading

### Coherence Mails

Coherence uses Swoosh as it's mailer lib. In development, we use Swoosh's local adapter, which
mounts a mini email client that displays sent emails at `{BASE_URL}/dev/mailbox`. That comes handy
to test flows which depend on email without having to send them in development.

## Learn more

* Phoenix
  * Official website: http://www.phoenixframework.org/
  * Guides: http://phoenixframework.org/docs/overview
  * Docs: https://hexdocs.pm/phoenix
  * Mailing list: http://groups.google.com/group/phoenix-talk
  * Source: https://github.com/phoenixframework/phoenix
