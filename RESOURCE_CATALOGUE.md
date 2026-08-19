# India Resource Catalogue

The game now supports all **28 Indian states and 8 Union Territories** through the official Integrated Government Online Directory. The backend exposes `/api/v1/resources/regions` and `/api/v1/resources/catalogue` so the client can filter by state or Union Territory, profession, organisation type, and free-access model.

The broad profession taxonomy is intentionally compact: **law, marketing, finance, business, IT, engineering, education, agriculture, health, creative, and jobs**. A resource can have multiple tags, which avoids forcing users through deep classification trees.

Government schemes should primarily be discovered through [myScheme](https://www.myscheme.gov.in/) and official state/UT directories from [IGOD](https://igod.gov.in/sg/states). The catalogue also includes Skill India Digital, SWAYAM, NPTEL, Startup India, Udyam Registration, eCourts, India Code, RBI financial education, and SEBI Investor.

Non-government resources are deliberately labelled as **PRIVATE_LIMITED**, **NONPROFIT**, or **EDUCATIONAL**. They are not presented as government-endorsed. Each entry carries an access model such as `FREE`, `FREE_AUDIT`, or `FREE_TIER`, a verification source, and a verification status. Users should always confirm current fees, eligibility, privacy terms, and programme availability on the destination website.

The phrase “every free site” is not treated as a literal promise because websites change, disappear, introduce paid tiers, or vary by course. The implementation is a curated and extensible catalogue designed so administrators can add, review, expire, or replace entries without changing the Godot client.

Sources: [IGOD State/UT Directory](https://igod.gov.in/sg/states), [myScheme](https://www.myscheme.gov.in/), [Digital India myScheme overview](https://www.digitalindia.gov.in/initiative/myscheme/).
