export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    
    let response;
    let title = false;

    switch (page) {
        case '0':
            response = await fetch('/home.html');
            break;
        case '1':
            response = await fetch('/page1.html');
            title = true;
            break;
        case '2':
            response = await fetch('/page2.html');
            break;
        default:
            return new Response(JSON.stringify({ error: 'Invalid page' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (!response.ok) {
        return new Response(JSON.stringify({ error: 'Page not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }

    const html = await response.text();
    const mainContent = extractMainContent(html);

    return new Response(JSON.stringify({ title, html: mainContent }), { status: 200, headers: { 'Content-Type': 'application/json' } });
}

function extractMainContent(html) {
    const mainTagStart = html.indexOf('<main');
    const mainTagEnd = html.indexOf('</main>') + 7;
    
    if (mainTagStart === -1 || mainTagEnd === -1) {
        return '';
    }

    return html.slice(mainTagStart, mainTagEnd).trim();
}
