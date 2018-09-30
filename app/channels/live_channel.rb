class LiveChannel < ApplicationCable::Channel
  LIVE = "live"

  def subscribed
    stream_from(LIVE)
  end

  def unsubscribed
  end
end
