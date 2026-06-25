const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const deleted = `                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="feature-content reveal reveal-left">
                    <div class="feature-badge">
                        <div class="dot"></div>
                        <span>Animation • Precision</span>
                    </div>
                    <h3>LuckyCurves: <br>Perfect Dynamics</h3>
                    <p>Take absolute control over your animation dynamics. Please note that LuckyCurves serves a highly specific purpose: applying curves, clearing curves, and creating custom profiles. There are no other complex options—it is a laser-focused tool designed purely to achieve smooth animations.</p>
                </div>
            </div>`;

// Check if the block is missing
if (!content.includes('Perfect Dynamics')) {
    content = content.replace('<source src="luckycurves.mp4" type="video/mp4">', '<source src="luckycurves.mp4" type="video/mp4">\n' + deleted);
    fs.writeFileSync('index.html', content, 'utf8');
    console.log('Restored broken section.');
} else {
    console.log('Section already exists or could not find anchor.');
}
