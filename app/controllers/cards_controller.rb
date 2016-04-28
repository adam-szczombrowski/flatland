class CardsController < ApplicationController
  def index
    @cards = Card.all
    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @cards }
    end
  end

  def new
    @card = Card.new
  end

  def create
    @card = Card.new(card_params)
    if @card.save
      redirect_to new_card_path
    else
      redirect_to root_path
    end
  end

  private

  def card_params
    params.require(:card).permit(:name, :year, :image)
  end
end
