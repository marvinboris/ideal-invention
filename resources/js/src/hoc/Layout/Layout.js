import React from 'react';

import './Layout.css';

export default ({ children }) => <div className="min-vh-100 d-flex flex-column text-secondary bg-green-10">
    <main className="flex-fill d-flex flex-column container">
        {children}
    </main>

    <footer className="text-center py-3">
        Copyrights {(new Date()).getFullYear()}. All rights reserved.
    </footer>
</div>;