class CardsControllerController < ApplicationController
  def index
    @cards = Card.all
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @cards }
    end
  end
end
