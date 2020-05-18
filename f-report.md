The new feature: Report Generator

This will be for the daily report. Not for the specific cases during the shift.

Tech Overview:
* Universal, for all types of daily reports, so no hard-coded titles of the sections and so on.

* Database:
 - reports named collection
 - each date has a report object so-called objector
 - To switch on the next date, the previous should be closed. This resolves the daily reports completed after 00:00. 'The next date' should be the actual date.

* Views:
 - Main view: Each section of the daily report displayed in a expandable widget. With a feature for adding data.
 - History reports: Two views: One for every date. No paging for now. One for the inner-side without being able to edit anything. Features: Adding info if the report got a response.
 - Generated report. Features: Copy, SMTP

Git specifics: Name of the branch: f-report

Workflow:
 - Schema design
 - REST API
 - Front-End