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
