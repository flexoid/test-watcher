# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

test_run = TestRun.create!(name: "Sample Test Run")

test_run.test_cases.create!(name: "Index page has company logo")
test_run.test_cases.create!(name: "Index page has link to about page")
test_run.test_cases.create!(name: "About page has product description")
test_run.test_cases.create!(name: "Click on company logo redirects to the main page")
