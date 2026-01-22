Feature: Chore Management
  As a user
  I want to manage my recurring chores
  So that I can keep on top of household tasks

  Scenario: Add a daily recurring task
    Given an empty Choar board
    When Chris adds "empty bins" as a daily recurring task
    Then "empty bins" shows up in the daily recurring task bucket

  Scenario: Mark a weekly task as done
    Given Chris has "vacuum" as a weekly recurring task
    When Chris toggles it as done
    Then it moves to the done side of the weekly recurring task bucket
