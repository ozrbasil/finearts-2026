function adminPanel() {
    const content = {
        dashboard: adminDashboard,
        updates: () => newsCard() + slideCard(),
        participants: () => partCard() + importCard(),
        teams: adminTeamsCard,

        competition: () =>
            `<div class="card">
                <b>Add competition</b>
                <br><br>
                <div class="row">
                    <select id="ct">
                        <option>Individual</option>
                        <option>Group</option>
                    </select>
                    <input id="cn" placeholder="Competition name">
                    <button class="btn" onclick="addC()">Add</button>
                </div>
            </div>` + markCard(),

        settings: settCard,
        templates: tplCard,

        results: () =>
            pubCard() +
            adminCompetitionResultsCard() +
            `<div class="admin-current-points">
                <div class="points-heading">
                    <span></span>
                    <div>
                        <b>Current Lead Points</b>
                        <small>AFTER RESULTS PUBLISHED</small>
                    </div>
                </div>
                <div class="points-card">
                    ${standings().map(t => `
                        <div class="points-row">
                            <b>${esc(t.n)}</b>
                            <strong>${t.p || 0}</strong>
                        </div>
                    `).join("") ||
                    '<p class="mu">No teams added yet.</p>'}
                </div>
            </div>`,

        schedule: schedCard,
        stars: starsCard,
        gallery: adminGalleryCard
    };

    const active =
        ADMIN_SECTIONS.find(x => x[0] === adminTab) ||
        ADMIN_SECTIONS[0];

    return `
        <div class="admin-shell">

            <aside class="admin-sidebar">

                <nav class="admin-side-links">
                    ${ADMIN_SECTIONS.map(([id, label]) => `
                        <button
                            class="admin-side-link ${adminTab === id ? "active" : ""}"
                            onclick="setAdminTab('${id}')">
                            ${label}
                        </button>
                    `).join("")}
                </nav>

                <button
                    class="btn d admin-restore"
                    onclick="cf(this,()=>{
                        fresh();
                        save();
                        [0,1,2].forEach(loadBg);
                        loadLogo();
                        render()
                    })">
                    Restore all Data
                </button>

            </aside>

            <main class="admin-main">

                <header class="admin-main-header">
                    <h2 class="admin-section-title">
                        ${active[1]}
                    </h2>
                </header>

                <section class="admin-content">
                    <div class="card mu admin-note">
                        Every add, remove or edit is staged here first.
                        Press <b>Update Site</b> in the top bar to publish
                        everything. Visitors' phones refresh by themselves
                        within a few seconds.
                    </div>

                    ${(content[adminTab] || adminDashboard)()}
                </section>

            </main>

        </div>
    `;
}
