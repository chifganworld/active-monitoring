# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     ActiveMonitoring.Repo.insert!(%ActiveMonitoring.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias ActiveMonitoring.{Repo, Call, Subject, CallAnswer, Channel, Campaign}

channel = Repo.insert!(%Channel{name: "channel seed", uuid: Ecto.UUID.generate()})
symptoms = [["1", "Fever"],["2","Rash"]]
campaign = Repo.insert!(%Campaign{
  name: "Campaign Seed",
  symptoms: symptoms,
  forwarding_condition: "any",
  forwarding_number: "12345678",
  langs: ["en"],
  additional_information: "zero",
  started_at: Ecto.DateTime.utc()
})

subjects = [
  Repo.insert!(%Subject{phone_number: "123456781"}),
  Repo.insert!(%Subject{phone_number: "123456782"}),
  Repo.insert!(%Subject{phone_number: "123456783"}),
  Repo.insert!(%Subject{phone_number: "123456784"}),
  Repo.insert!(%Subject{phone_number: "123456785"}),
  Repo.insert!(%Subject{phone_number: "123456786"}),
  Repo.insert!(%Subject{phone_number: "123456787"}),
  Repo.insert!(%Subject{phone_number: "123456788"}),
  Repo.insert!(%Subject{phone_number: "123456789"}),
  Repo.insert!(%Subject{phone_number: "123456780"}),
]


for i <- 1..30 do
  step = Enum.random(["welcome","thanks"])
  call = Repo.insert!(%Call{
      sid: "SID_#{i}",
      language: "en",
      campaign_id: campaign.id,
      channel_id: channel.id,
      current_step: step,
      subject_id: Enum.random(subjects).id
    })
  if step == "thanks" do
    Repo.insert!(%CallAnswer{campaign_id: campaign.id, call_id: call.id, symptom: "1", response: Enum.random([true, false])})
    Repo.insert!(%CallAnswer{campaign_id: campaign.id, call_id: call.id, symptom: "2", response: Enum.random([true, false])})
  end
end
