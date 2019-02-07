# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

strList = [
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2016-10/animals_hero_penguin_02_1.jpg?h=82c7503b&itok=KFPBKzZo",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2018-07/animals_hero_african-giant-pouched-rat.jpg?h=d1cb525d&itok=mFe1JcGa",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2018-08/animals_hero_pygmy-falcon.jpg?h=d1cb525d&itok=VOQmKYcP",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2016-11/animals_hero_pygmy_goose.jpg?h=7ccc6fb8&itok=P4vzj3oc",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2016-11/animals_hero_african_spurred_tortoise.jpg?h=d1cb525d&itok=7vKGxigT",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2016-09/animals_hero_agouti_0.jpg?h=d1cb525d&itok=WKOMzmTb",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2016-09/animals_hero_anaconda.jpg?h=d1cb525d&itok=6jMF0BIi",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2016-09/animals_hero_spectacledbear.jpg?h=d1cb525d&itok=kYegLzNs",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2018-06/animals_hero_brushturkey.jpg?h=cee7880a&itok=pbZ3Pbem",
    "https://animals.sandiegozoo.org/sites/default/files/styles/view_thumbnail/public/2017-02/animals_hero_barbirusa.jpg?h=9bffc0d4&itok=8G-ZX4eJ"
]

strList.each do |image|
    Image.create!(url: "#{image}")
end