import { currentLanguage } from './lang';  

const about = document.querySelector<HTMLElement>('.info');
if (about) {
  const ukrainianHtml = about.innerHTML;
  const englishHtml = `
    <h2>What is austerity?</h2>
    <p>Austerity is a voluntary commitment you make to yourself to build self-discipline, develop healthy habits, and reach personal goals. For a set period, you consciously give up a habit or add a useful action to your life. The aim is to manage your actions, focus on what matters, and keep moving towards the result you want.</p>
    <h2>How does it work?</h2>
    <ul class="list">
      <li><h4>Focus and discipline.</h4><p>You learn to choose your actions deliberately instead of following habits automatically. This helps you give more attention to your priorities.</p></li>
      <li><h4>Working with habits.</h4><p>Giving up unwanted behavior or regularly doing something useful can gradually change your daily habits.</p></li>
      <li><h4>A clear intention.</h4><p>Setting a goal gives your effort direction. You know why you are making the effort.</p></li>
      <li><h4>Results through action.</h4><p>Decide what you want to give up or which useful habit you want to build.</p></li>
    </ul>
    <h2>4 steps to a successful austerity</h2>
    <ul class="list2">
      <li><h4>Step 1. Choose an action.</h4><p>Decide what you want to give up or which useful habit you want to build.</p><h4>For example:</h4><ul><li>give up sweets;</li><li>limit social media use;</li><li>start exercising regularly;</li><li>read every day;</li><li>wake up earlier.</li></ul></li>
      <li><h4>Step 2. Set a duration.</h4><p>Choose how long you will stick to your decision. You could start with 7 or 14 days, then extend it to 21 or 30 days. Choose a period you can realistically manage.</p></li>
      <li><h4>Step 3. Set your intention.</h4><p>Decide what you want to give up or which useful habit you want to build.</p><h4>Think about the result.</h4><p>Define why you are starting this austerity.</p><h4>For example:</h4><ul><li>improve your fitness;</li><li>build self-discipline;</li><li>spend more time learning;</li><li>finish an important project;</li><li>improve your everyday life.</li></ul><p>Write down your goal so you remember why you started.</p></li>
      <li><h4>Step 4. Stick to your decision.</h4><p>Do your chosen action every day or follow the limit you set. Mark completed days on the calendar and track your progress. Use this time to take concrete steps towards your goal.</p></li>
    </ul>
    <h2>What if you break your commitment?</h2>
    <p>Do not treat a mistake as total failure. Pause, consider what got in the way, and think about how to handle that situation next time. If you set clear rules, assess the outcome against those rules. Be honest with yourself, but do not use one setback as a reason to give up. The process can help you understand your habits and learn to guide your behavior.</p>
    <h2>How can you tell whether it helped?</h2>
    <p>After you finish, ask yourself:</p>
    <ul><li>Was I able to stick to my decision?</li><li>What was the hardest part?</li><li>What changes did I notice in my behavior?</li><li>What did I learn during this period?</li><li>What would I like to keep doing?</li></ul>
    <p>Your result is not only reaching your original goal, but also what you learned along the way.</p>
    <h2>Your journey starts today</h2>
    <p>You do not have to change your whole life in one day. Choose one action, set a goal, and start with a manageable step.</p>
    <p>Austerity is not punishment or a fight against yourself. It is a deliberate choice to make changes you want to see in your life.</p>`;
  const dutchHtml = `
    <h2>Wat is askesis?</h2>
    <p>Askesis is een vrijwillige belofte aan jezelf om zelfdiscipline op te bouwen, gezonde gewoonten te ontwikkelen en persoonlijke doelen te bereiken. Gedurende een bepaalde periode stop je bewust met een gewoonte of voeg je een nuttige handeling toe aan je leven. Zo leer je je gedrag te sturen, je te richten op wat belangrijk is en stap voor stap je doel te bereiken.</p>
    <h2>Hoe werkt het?</h2>
    <ul class="list">
      <li><h4>Focus en discipline.</h4><p>Je leert bewust te kiezen wat je doet, in plaats van automatisch je gewoonten te volgen. Zo geef je meer aandacht aan je prioriteiten.</p></li>
      <li><h4>Werken aan gewoonten.</h4><p>Ongewenst gedrag opgeven of regelmatig iets nuttigs doen, kan je dagelijkse gewoonten geleidelijk veranderen.</p></li>
      <li><h4>Een duidelijke intentie.</h4><p>Een doel geeft je inspanningen richting. Je weet waarvoor je het doet.</p></li>
      <li><h4>Resultaat door actie.</h4><p>Bepaal waarmee je wilt stoppen of welke nuttige gewoonte je wilt ontwikkelen.</p></li>
    </ul>
    <h2>4 stappen naar een succesvolle askesis</h2>
    <ul class="list2">
      <li><h4>Stap 1. Kies een actie.</h4><p>Bepaal waarmee je wilt stoppen of welke nuttige gewoonte je wilt ontwikkelen.</p><h4>Bijvoorbeeld:</h4><ul><li>geen snoep meer eten;</li><li>minder sociale media gebruiken;</li><li>regelmatig gaan sporten;</li><li>elke dag lezen;</li><li>vroeger opstaan.</li></ul></li>
      <li><h4>Stap 2. Bepaal de duur.</h4><p>Kies hoelang je je aan je besluit wilt houden. Begin bijvoorbeeld met 7 of 14 dagen en verleng dit later naar 21 of 30 dagen. Kies een periode die haalbaar is.</p></li>
      <li><h4>Stap 3. Formuleer je intentie.</h4><p>Bepaal waarmee je wilt stoppen of welke nuttige gewoonte je wilt ontwikkelen.</p><h4>Denk na over het resultaat.</h4><p>Bepaal waarom je met deze askesis begint.</p><h4>Bijvoorbeeld:</h4><ul><li>je conditie verbeteren;</li><li>zelfdiscipline ontwikkelen;</li><li>meer tijd aan leren besteden;</li><li>een belangrijk project afronden;</li><li>je dagelijks leven verbeteren.</li></ul><p>Schrijf je doel op, zodat je onthoudt waarom je bent begonnen.</p></li>
      <li><h4>Stap 4. Houd je aan je besluit.</h4><p>Voer je gekozen actie dagelijks uit of houd je aan de afgesproken beperking. Markeer voltooide dagen in de kalender en volg je voortgang. Gebruik deze tijd om concrete stappen naar je doel te zetten.</p></li>
    </ul>
    <h2>Wat als je je afspraak niet nakomt?</h2>
    <p>Zie een fout niet als een totale mislukking. Sta stil bij wat je tegenhield en bedenk hoe je die situatie de volgende keer kunt aanpakken. Beoordeel het resultaat aan de hand van de regels die je zelf hebt opgesteld. Wees eerlijk tegen jezelf, maar geef niet op door één tegenslag. Zo leer je je gewoonten beter begrijpen en je gedrag sturen.</p>
    <h2>Hoe weet je of het heeft geholpen?</h2>
    <p>Stel jezelf na afloop deze vragen:</p>
    <ul><li>Kon ik me aan mijn besluit houden?</li><li>Wat was het moeilijkst?</li><li>Welke veranderingen merkte ik in mijn gedrag?</li><li>Wat heb ik in deze periode geleerd?</li><li>Wat wil ik blijven doen?</li></ul>
    <p>Je resultaat is niet alleen het behalen van je oorspronkelijke doel, maar ook wat je onderweg hebt geleerd.</p>
    <h2>Je begint vandaag</h2>
    <p>Je hoeft niet je hele leven in één dag te veranderen. Kies één actie, stel een doel en begin met een haalbare stap.</p>
    <p>Askesis is geen straf en geen strijd met jezelf. Het is een bewuste keuze voor de veranderingen die je in je leven wilt zien.</p>`;

  function applyAboutLanguage(): void {
    about!.innerHTML = currentLanguage === 'uk' ? ukrainianHtml : currentLanguage === 'nl' ? dutchHtml : englishHtml;
  }

  applyAboutLanguage();
  window.addEventListener('languageChanged', applyAboutLanguage);
}



const politic = document.querySelector<HTMLElement>('.politic');
if (politic) {
     const ukrainianHtml = politic.innerHTML;
      const englishHtml = `<div>
      <div class="button"><button class="button-arrow-right"><i class="fa-solid fa-right-long"></i></button></div>  
    <h1>Privacy Policy</h1>
    <h3>My Ascesa</h3>
    <p>Last updated: 08.11.2026</p>

    <ul class="listGen">
      <li>General Provisions
        <p>"My Askesa" - is an application for creating, planning, and tracking personal askesis, habits, and goals.
          We respect users' privacy and strive to ensure the proper protection of their personal data.
          By using My Askesis, you agree to the terms of this Privacy Policy.</p>
      </li>

      <li>What Data We Collect
        <p>The following data may be used to operate the application:</p>
        <ul class="listUsualy">
          <li>email address required for registration and authentication;</li>
          <li>information about created askesis;</li>
          <li>duration of askesis and expected results;</li>
          <li>records of completed days and user progress;</li>
          <li>technical information required for the application to function.</li>
        </ul>
      </li>

      <li>Data Storage and Protection
        <p>The Supabase platform is used to store data and provide authentication.
          AES-256-GCM encryption is used to provide additional protection for askesis data.
          Encryption and decryption are performed automatically when the relevant data is saved and retrieved.
          We take technical measures to protect information against unauthorized access, loss, or disclosure.</p>
      </li>

      <li>Use of Data
        <p>The collected information is used exclusively for:</p>
        <ul class="listUsualy">
          <li>providing the application's core features;</li>
          <li>storing and displaying personal askesis;</li>
          <li>user authentication;</li>
          <li>ensuring the security and stability of the service.</li>
        </ul>
      </li>

      <li>Sharing Data with Third Parties
        <p>Data may be processed by third-party technical services that support the operation of the application, including Supabase and Vercel.
          We do not sell users' personal data.</p>
      </li>

      <li>User Rights
        <p>Users have the right to:</p>
        <ul class="listUsualy">
          <li>request information about their data;</li>
          <li>request correction of inaccurate information;</li>
          <li>request the deletion of their data;</li>
          <li>stop using the application.</li>
        </ul>
      </li>

      <li>Changes to This Policy
        <p>We reserve the right to update this Privacy Policy. The current version is always available on this page.</p>
      </li>
    </ul>
          </div>`;
      const dutchHtml =  `<div>
      <div class="button"><button class="button-arrow-right"><i class="fa-solid fa-right-long"></i></button></div>  
      <h1>Privacybeleid</h1>
<h3>My Askesa</h3>
<p>Laatst bijgewerkt: 08.11.2026</p>

<ul class="listGen">
  <li>Algemene bepalingen
    <p>"My Askesa" - is een applicatie voor het creëren, plannen en bijhouden van persoonlijke askese, gewoonten en doelen.
      Wij respecteren de privacy van onze gebruikers en streven ernaar hun persoonsgegevens goed te beschermen.
      Door My Askesis te gebruiken, gaat u akkoord met de bepalingen van dit privacybeleid.</p>
  </li>

  <li>Welke gegevens verzamelen wij?
    <p>Voor het functioneren van de applicatie kunnen de volgende gegevens worden gebruikt:</p>
    <ul class="listUsualy">
      <li>e-mailadres dat nodig is voor registratie en authenticatie;</li>
      <li>informatie over aangemaakte askese;</li>
      <li>de duur van askese en de verwachte resultaten;</li>
      <li>registraties van voltooide dagen en de voortgang van de gebruiker;</li>
      <li>technische informatie die nodig is voor het functioneren van de applicatie.</li>
    </ul>
  </li>

  <li>Gegevensopslag en -beveiliging
    <p>Het Supabase-platform wordt gebruikt voor gegevensopslag en gebruikersauthenticatie.
      Voor extra bescherming van askesegegevens wordt AES-256-GCM-versleuteling toegepast.
      Het versleutelen en ontsleutelen gebeurt automatisch bij het opslaan en ophalen van de betreffende gegevens.
      Wij nemen technische maatregelen om informatie te beschermen tegen ongeoorloofde toegang, verlies of openbaarmaking.</p>
  </li>

  <li>Gebruik van gegevens
    <p>De verzamelde informatie wordt uitsluitend gebruikt voor:</p>
    <ul class="listUsualy">
      <li>het aanbieden van de belangrijkste functies van de applicatie;</li>
      <li>het opslaan en weergeven van persoonlijke askese;</li>
      <li>gebruikersauthenticatie;</li>
      <li>het waarborgen van de veiligheid en stabiliteit van de dienst.</li>
    </ul>
  </li>

  <li>Gegevens delen met derden
    <p>Gegevens kunnen worden verwerkt door externe technische diensten die nodig zijn voor het functioneren van de applicatie, waaronder Supabase en Vercel.
      Wij verkopen geen persoonsgegevens van gebruikers.</p>
  </li>

  <li>Rechten van gebruikers
    <p>Gebruikers hebben het recht om:</p>
    <ul class="listUsualy">
      <li>informatie over hun gegevens op te vragen;</li>
      <li>correctie van onjuiste informatie te verzoeken;</li>
      <li>verwijdering van hun gegevens te verzoeken;</li>
      <li>te stoppen met het gebruik van de applicatie.</li>
    </ul>
  </li>

  <li>Wijzigingen in dit privacybeleid
    <p>Wij behouden ons het recht voor om dit privacybeleid bij te werken. De actuele versie is altijd beschikbaar op deze pagina.</p>
  </li>
</ul>
      </div>`;

      function applyAboutLanguage(): void {
          politic!.innerHTML = currentLanguage === 'uk' ? ukrainianHtml : currentLanguage === 'nl' ? dutchHtml : englishHtml;
        }
      
        applyAboutLanguage();
        window.addEventListener('languageChanged', applyAboutLanguage);
      }


const condit = document.querySelector<HTMLElement>('.condit');
if ( condit) {
     const ukrainianHtml =  condit.innerHTML;

      const englishHtml = `<div>
       <div class="button"><button class="button-arrow-left"><i class="fa-solid fa-left-long"></i></button></div> 
      <h1>Terms of Use</h1>
<ul>
  <li><h3>Purpose of the Application</h3>
    <p>My Askesis is designed for personal use to develop self-discipline, build healthy habits, maintain personal commitments, and track individual progress.</p>
  </li>
  <li><h3>Registration and Account</h3>
    <p>Registration may be required to use certain features of the application.
    Users agree to provide accurate information and take responsibility for the security of their accounts.</p>
  </li>
  <li><h3>User Responsibility</h3>
    <p>Users independently define their goals, create askesis, and make decisions regarding their completion.
    My Askesis is a personal organization and self-discipline tool and does not guarantee specific results.</p>
  </li>
  <li><h3>Rules of Use</h3>
    <p>When using the application, users are prohibited from:
    using the service in violation of applicable laws;
    attempting to gain unauthorized access to other users' data;
    interfering with the operation of the application's backend or infrastructure;
    using the application for harmful or illegal activities.</p>
  </li>
  <li><h3>Service Availability</h3>
    <p>We strive to ensure the stable operation of My Askesis but do not guarantee uninterrupted service availability.
    The application may be temporarily unavailable due to maintenance, updates, or technical circumstances beyond our control.</p>
  </li>
  <li><h3>Intellectual Property</h3>
    <p>The name, design, interface, source code, and other elements of My Askesis are the intellectual property of their respective rights holders.
    Copying, distributing, or using the application's materials without proper authorization is prohibited, except where permitted by law.</p>
  </li>
  <li><h3>Acceptance of Terms</h3>
    <p>By using My Askesis, users confirm that they have read and agree to this Privacy Policy and the Terms of Use.</p>
  </li>
</ul>
      </div>`;

      const dutchHtml =  `<div>
     <div class="button"><button class="button-arrow-left"><i class="fa-solid fa-left-long"></i></button></div>
        <h1>Gebruiksvoorwaarden</h1>
<ul>
  <li><h3>Doel van de applicatie</h3>
    <p>My Askesis is bedoeld voor persoonlijk gebruik om zelfdiscipline te ontwikkelen, goede gewoonten op te bouwen, persoonlijke verplichtingen na te komen en de eigen voortgang bij te houden.</p>
  </li>
  <li><h3>Registratie en account</h3>
    <p>Voor het gebruik van bepaalde functies van de applicatie kan registratie vereist zijn.
    De gebruiker verplicht zich om juiste informatie te verstrekken en zorgvuldig om te gaan met de beveiliging van zijn of haar account.</p>
  </li>
  <li><h3>Verantwoordelijkheid van de gebruiker</h3>
    <p>De gebruiker bepaalt zelfstandig zijn of haar doelen, stelt askeses op en neemt beslissingen over de uitvoering ervan.
    My Askesis is een hulpmiddel voor persoonlijke organisatie en zelfdiscipline en garandeert geen specifieke resultaten.</p>
  </li>
  <li><h3>Gebruiksregels</h3>
    <p>Bij het gebruik van de applicatie is het verboden om:
    de dienst te gebruiken in strijd met de geldende wetgeving;
    te proberen ongeoorloofde toegang te krijgen tot gegevens van andere gebruikers;
    de werking van de serveromgeving of infrastructuur van de applicatie te verstoren;
    de applicatie te gebruiken voor schadelijke of illegale activiteiten.</p>
  </li>
  <li><h3>Beschikbaarheid van de dienst</h3>
    <p>We streven ernaar My Askesis stabiel te laten functioneren, maar garanderen geen ononderbroken beschikbaarheid van de dienst.
    De werking van de applicatie kan tijdelijk worden beperkt door onderhoud, updates of technische omstandigheden buiten onze controle.</p>
  </li>
  <li><h3>Intellectueel eigendom</h3>
    <p>De naam, het ontwerp, de interface, de broncode en andere onderdelen van My Askesis zijn intellectueel eigendom van hun respectieve rechthebbenden.
    Het kopiëren, verspreiden of gebruiken van materiaal uit de applicatie zonder de juiste toestemming is verboden, behalve wanneer dit wettelijk is toegestaan.</p>
  </li>
  <li><h3>Acceptatie van de voorwaarden</h3>
    <p>Door My Askesis te gebruiken, bevestigt de gebruiker dat hij of zij dit privacybeleid en deze gebruiksvoorwaarden heeft gelezen en ermee akkoord gaat.</p>
  </li>
</ul>
      </div>`

       function applyAboutLanguage(): void {
          condit!.innerHTML = currentLanguage === 'uk' ? ukrainianHtml : currentLanguage === 'nl' ? dutchHtml : englishHtml;
        }
      
        applyAboutLanguage();
        window.addEventListener('languageChanged', applyAboutLanguage)

     }