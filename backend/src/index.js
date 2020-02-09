import app from './app';

// Start the server
async function main() {
    await app.listen(app.get('port'), () => {
        console.log('>>> Server on port', app.get('port'));
    })
}

main();
