# Document

## Environment Requirement

* JDK : 1.8.0_05
* Gradle : 2.9
* Jetty : 9.3.5
* Ruby 2.0
* Bundle version 1.10.6

## Get Started
* > git clone https://github.com/Max-Hu/week7.git
* Enter the project dir
* > gradle build
* > gradle jettyRun

## Get Tested
* initialize test environment:
> bundle install  
* There are three features allow to test (search, addition and delete)  
> cucumber features/search.feature
> cucumber features/addition.feature
> cucumber features/delete.feature
* Note that all tests are based on the default data from "src/main/webapp/data/bookmarks.json".

