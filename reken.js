/* Rekenvragen 2 mavo H2 Jij en je geld (Geldjacht 2M): omrekenen, begroting, rente bij sparen, kosten van een lening, eigen risico en premie.
   Elke functie maakt een nieuwe vraag met nieuwe getallen:
   {p: paragraaf, k: kopje, v: vraagtekst, fig: html-tabel (mag ontbreken), formule: aanpak (alleen voor de AI), uitw: uitwerking,
    en óf ant/alt/soort/tol (één antwoordvak), óf delen:[{l:"a",ant,alt,soort,tol}] (een antwoordvak per deelvraag a/b/c)}
   alt = andere goed te rekenen antwoorden (bijv. tussendoor afgerond). Rekenwijze volgt het boek (eerst per jaar; percentage op 1 decimaal). */
function rnd(a,b){return a+Math.floor(Math.random()*(b-a+1));}
function pick(a){return a[Math.floor(Math.random()*a.length)];}
function rd(x,d){var f=Math.pow(10,d||0);return Math.round(x*f+(x>=0?1e-9:-1e-9))/f;}
function getalNL(x,d){return Number(x).toLocaleString("nl-NL",{minimumFractionDigits:d||0,maximumFractionDigits:d==null?2:d});}
function eu(x){var c=Math.abs(rd(x,2)%1)>0.0001;return (x<0?"− ":"")+"€ "+getalNL(Math.abs(x),c?2:0);}
function e2(x){return (x<0?"− ":"")+"€ "+getalNL(Math.abs(x),2);}
function pc(x){return getalNL(x,1)+"%";}
function pr(x){return getalNL(x,x%1?(rd(x,1)===x?1:2):0)+"%";} // percentage zoals gegeven (2,5% · 1,25% · 3%)
function cent(a,b){return rnd(Math.round(a*100),Math.round(b*100))/100;}
function tab(kop,rijen){return '<table class="doc"><tr>'+kop.map(function(k,i){return '<th'+(i?' class="n"':'')+'>'+k+'</th>';}).join("")+'</tr>'+
  rijen.map(function(r){return '<tr>'+r.map(function(c,i){return '<td'+(i?' class="n"':'')+'>'+c+'</td>';}).join("")+'</tr>';}).join("")+'</table>';}
var NAMEN=["Sanne","Yusuf","Fleur","Ruben","Noah","Aylin","Daan","Mila","Mohammed","Lotte","Bram","Priya","Jesse","Fatima","Sem","Noor","Liam","Zeynep","Tim","Nora"];
var BRON="\n\n",RO2=" Rond af op 2 decimalen.",RO1=" Rond af op 1 decimaal.",RO2A="\nRond je antwoorden af op 2 decimalen.";
var KOP={om:"Omrekenen van week naar maand en andersom",uit:"Soorten uitgaven",beg:"Uitkomen met je inkomen",rente:"Rekenen met rente",
  bank:"Lenen bij een bank",kost:"Wat kost een lening?",proc:"Hoeveel procent is dat?",eig:"Wat keert de verzekering uit?",prem:"Een verzekering kost geld"};
// maandtermijn van een lening (annuïteit), afgerond op hele euro's zoals in een tabel van de bank
function termijn(b,jr,m){var i=jr/1200;return Math.round(b*i/(1-Math.pow(1+i,-m)));}

var REKEN=[
/* ---------- 2.1 Omrekenen ---------- */
function(){var n=pick(NAMEN),c=pick([
  function(){var w=pick([12.5,15,17.5,18,22.5,24,27.5,32,35,38.5]),j=rd(w*52,2),m=rd(j/12,2),wat=pick(["met een krantenwijk","met vakken vullen","met oppassen","met een afwasbaantje"]);
    return {v:n+" verdient elke week "+e2(w)+" "+wat+"."+BRON+"a. Bereken hoeveel "+n+" per jaar verdient.\nb. Bereken hoeveel "+n+" gemiddeld per maand verdient."+RO2A,
      delen:[{l:"a",ant:j,soort:"euro"},{l:"b",ant:m,soort:"euro"}],formule:"per jaar = weekbedrag × 52; per maand = jaarbedrag : 12",uitw:"a. "+getalNL(w,2)+" × 52 = "+e2(j)+"; b. "+getalNL(j,2)+" : 12 = "+e2(m)};},
  function(){var m=pick([15,18,20,22.5,25,30,35,39.99,42.5,49.95]),j=rd(m*12,2),w=rd(j/52,2),wat=pick(["de sportschool","de muziekles","een streamingdienst","zijn telefoonabonnement","de contributie van de voetbalclub"]);
    return {v:n+" betaalt elke maand "+e2(m)+" voor "+wat+". "+n+" wil weten hoeveel dat per week is."+BRON+"a. Bereken hoeveel "+n+" per jaar betaalt.\nb. Bereken hoeveel dat gemiddeld per week is."+RO2A,
      delen:[{l:"a",ant:j,soort:"euro"},{l:"b",ant:w,soort:"euro"}],formule:"per jaar = maandbedrag × 12; per week = jaarbedrag : 52",uitw:"a. "+getalNL(m,2)+" × 12 = "+e2(j)+"; b. "+getalNL(j,2)+" : 52 = "+e2(w)};},
  function(){var w=pick([5,7.5,8,10,12.5]),m=pick([25,30,35,40,45]),wm=rd(w*52/12,2),meer=wm>m;
    return {v:n+" kan kiezen: elke week "+e2(w)+" zakgeld of elke maand "+e2(m)+" zakgeld."+BRON+"Bereken hoeveel het weekgeld per maand is. Rond af op 2 decimalen. (Daarna weet je welke keuze het meeste geld oplevert.)",
      ant:wm,soort:"euro",formule:"weekbedrag × 52 : 12",uitw:getalNL(w,2)+" × 52 = "+e2(w*52)+"; : 12 = "+e2(wm)+" → "+(meer?"weekgeld":"maandgeld")+" levert meer op"};}
  ])();
  c.p="2.1";c.k=KOP.om;return c;},

/* ---------- 2.1 Begroting en uitgaven ---------- */
function(){var n=pick(NAMEN),zak=pick([25,30,35,40]),baan=rnd(8,22)*10,tel=pick([10,12.5,15,17.5]),sport=pick([12,15,18,20]),snoep=rnd(15,40),kled=rnd(4,9)*10;
  var inn=zak+baan,uit=tel+sport+snoep+kled,s=rd(inn-uit,2);
  return {p:"2.1",k:KOP.beg,v:n+" maakt een begroting voor volgende maand."+BRON+"Bereken of "+n+" geld overhoudt of tekortkomt. Schrijf een tekort met een min ervoor.",
    fig:tab(["Begroting "+n,"per maand"],[["Inkomsten: zakgeld",e2(zak)],["Inkomsten: bijbaan",e2(baan)],["Uitgaven: telefoonabonnement",e2(tel)],["Uitgaven: contributie sportclub",e2(sport)],["Uitgaven: snoep en drinken",e2(snoep)],["Uitgaven: kleding",e2(kled)]]),
    ant:s,soort:"euro",formule:"totaal inkomsten − totaal uitgaven",uitw:"inkomsten "+e2(inn)+" − uitgaven "+e2(uit)+" = "+e2(s)};},
function(){var n=pick(NAMEN),wz=pick([5,7.5,10]),baan=rnd(6,16)*10,tel=pick([10,12.5,15]),uitg=rnd(20,45),cad=rnd(10,25);
  var zm=rd(wz*52/12,2),inn=rd(zm+baan,2),uit=tel+uitg+cad,s=rd(inn-uit,2);
  return {p:"2.1",k:KOP.om,v:n+" krijgt elke week "+e2(wz)+" zakgeld en verdient "+e2(baan)+" per maand met een bijbaan. Per maand geeft "+n+" uit: "+e2(tel)+" telefoon, "+e2(uitg)+" uitgaan en "+e2(cad)+" cadeautjes."+BRON+"a. Bereken het zakgeld per maand.\nb. Bereken hoeveel "+n+" per maand overhoudt of tekortkomt. Schrijf een tekort met een min ervoor."+RO2A,
    delen:[{l:"a",ant:zm,soort:"euro"},{l:"b",ant:s,soort:"euro",alt:[rd(wz*52/12+baan-uit,2)]}],formule:"zakgeld per maand = weekbedrag × 52 : 12; daarna inkomsten per maand − uitgaven per maand",
    uitw:"a. "+getalNL(wz,2)+" × 52 : 12 = "+e2(zm)+"; b. "+getalNL(zm,2)+" + "+baan+" = "+e2(inn)+"; − "+e2(uit)+" = "+e2(s)};},
function(){var fam=pick(["Bakker","De Vries","El Amrani","Visser","Öztürk","Pinas"]),huur=rnd(68,98)*10,bood=rnd(45,70)*10,abo=pick([35,42,48,55]),verz=rnd(140,220),vak=rnd(9,18)*100,verzorg=rnd(60,110),wm=rnd(45,75)*10;
  var vast=huur+abo+verz;
  return {p:"2.1",k:KOP.uit,v:"Hieronder staan uitgaven van familie "+fam+" in één maand."+BRON+"Bereken hoeveel euro de vaste lasten in deze maand samen zijn.",
    fig:tab(["Uitgave","bedrag"],[["Huur",eu(huur)],["Boodschappen",eu(bood)],["Internet- en tv-abonnement",eu(abo)],["Nieuwe wasmachine",eu(wm)],["Zorgverzekering (premie)",eu(verz)],["Persoonlijke verzorging",eu(verzorg)],["Vakantie",eu(vak)]]),
    ant:vast,soort:"euro",formule:"vaste lasten optellen (huur, abonnement, premie zorgverzekering); boodschappen/verzorging = huishoudelijk, wasmachine/vakantie = incidenteel",
    uitw:huur+" + "+abo+" + "+verz+" = "+eu(vast)};},

/* ---------- 2.2 Rente bij sparen ---------- */
function(){var n=pick(NAMEN),c=pick([
  function(){var s=rnd(30,250)*10,r=pick([0.5,0.75,1,1.25,1.5,1.75,2,2.25,2.5,3]),a=rd(r/100*s,2);
    return {v:n+" heeft "+eu(s)+" op een spaarrekening. De bank geeft "+pr(r)+" rente per jaar."+BRON+"a. Bereken hoeveel rente "+n+" na een jaar krijgt.\nb. Bereken hoeveel geld er na een jaar op de spaarrekening staat."+RO2A,
      delen:[{l:"a",ant:a,soort:"euro"},{l:"b",ant:rd(s+a,2),soort:"euro"}],uitw:"a. "+pr(r)+" : 100 × "+s+" = "+e2(a)+"; b. "+s+" + "+getalNL(a,2)+" = "+e2(s+a)};},
  function(){var s=rnd(20,160)*25,r=pick([1,1.25,1.5,1.75]),r2=rd(r+pick([0.25,0.5,0.75,1]),2),a1=rd(r/100*s,2),a2=rd(r2/100*s,2);
    return {v:n+" heeft "+eu(s)+" gespaard. Bank A geeft "+pr(r)+" rente per jaar, bank B geeft "+pr(r2)+" per jaar."+BRON+"a. Bereken hoeveel rente "+n+" in een jaar krijgt bij bank B.\nb. Bereken hoeveel euro rente "+n+" per jaar méér krijgt bij bank B dan bij bank A."+RO2A,
      delen:[{l:"a",ant:a2,soort:"euro"},{l:"b",ant:rd(a2-a1,2),soort:"euro",alt:[rd((r2-r)/100*s,2)]}],uitw:"a. "+pr(r2)+" : 100 × "+s+" = "+e2(a2)+"; b. bank A: "+e2(a1)+"; "+getalNL(a2,2)+" − "+getalNL(a1,2)+" = "+e2(a2-a1)};},
  function(){var s=rnd(12,60)*100,r=pick([1.5,2,2.4,3]),mnd=pick([3,6,9]),j=rd(r/100*s,2),a=rd(j*mnd/12,2);
    return {v:n+" zet "+eu(s)+" op een spaarrekening met "+pr(r)+" rente per jaar. Na "+mnd+" maanden haalt "+n+" het geld er weer af."+BRON+"a. Bereken hoeveel rente "+n+" zou krijgen als het geld een heel jaar bleef staan.\nb. Bereken hoeveel rente "+n+" krijgt voor "+mnd+" maanden."+RO2A,
      delen:[{l:"a",ant:j,soort:"euro"},{l:"b",ant:a,soort:"euro"}],uitw:"a. "+pr(r)+" : 100 × "+s+" = "+e2(j)+"; b. "+getalNL(j,2)+" : 12 × "+mnd+" = "+e2(a)};}
  ])();
  c.p="2.2";c.k=KOP.rente;c.formule="rente per jaar = rentepercentage : 100 × spaargeld (korter dan een jaar: rente per jaar : 12 × aantal maanden)";return c;},
function(){var n=pick(NAMEN),s=rnd(8,40)*50,r=pick([1.5,2,2.5,3,4]),a1=rd(r/100*s,2),s1=rd(s+a1,2),a2=rd(r/100*s1,2);
  return {p:"2.2",k:"Wat levert sparen op?",v:"Oma zet voor "+n+" "+eu(s)+" op een spaarrekening met "+pr(r)+" rente per jaar. De rente blijft op de rekening staan."+BRON+"a. Bereken hoeveel er na 1 jaar op de rekening staat.\nb. Bereken hoeveel rente "+n+" in het tweede jaar krijgt."+RO2A,
    delen:[{l:"a",ant:s1,soort:"euro"},{l:"b",ant:a2,soort:"euro"}],formule:"rente jaar 1 = % : 100 × spaargeld; saldo na jaar 1 = spaargeld + rente; rente jaar 2 = % : 100 × saldo na jaar 1",
    uitw:"a. "+pr(r)+" van "+s+" = "+e2(a1)+"; "+s+" + "+getalNL(a1,2)+" = "+e2(s1)+"; b. "+pr(r)+" : 100 × "+getalNL(s1,2)+" = "+e2(a2)};},
function(){var n=pick(NAMEN),s=rnd(8,60)*50,r=pick([0.8,1.2,1.5,1.8,2.2,2.5,3.5]),a=rd(r/100*s,2),p=rd(a/s*100,1);
  return {p:"2.3",k:KOP.proc,v:n+" had een jaar lang "+eu(s)+" op een spaarrekening staan. Aan het eind van het jaar kreeg "+n+" "+e2(a)+" rente."+BRON+"Bereken hoeveel procent rente de bank gaf."+RO1,
    ant:p,soort:"procent",formule:"rente : spaargeld × 100",uitw:getalNL(a,2)+" : "+s+" × 100 = "+pc(p)};},

/* ---------- 2.3 Lenen ---------- */
function(){var n=pick(NAMEN),bs=[1000,2500,5000],ms=[12,24,36],jr=pick([7.9,8.9,9.9]),T=bs.map(function(b){return ms.map(function(m){return termijn(b,jr,m);});});
  var i=rnd(0,2),j=rnd(0,2),b=bs[i],m=ms[j],t=T[i][j],tot=t*m,k=tot-b,p=rd(k/b*100,1);
  var fig='<table class="doc"><tr><th>Maandtermijnen lening</th>'+ms.map(function(x){return '<th class="n">'+x+' maanden</th>';}).join("")+'</tr>'+
    bs.map(function(x,a){return '<tr><td>'+eu(x)+'</td>'+T[a].map(function(y){return '<td class="n">'+eu(y)+'</td>';}).join("")+'</tr>';}).join("")+'</table>';
  return {p:"2.3",k:KOP.kost,v:n+" (20) leent "+eu(b)+" bij de bank en betaalt de lening terug in "+m+" maanden. In de tabel zie je de maandtermijnen."+BRON+"a. Bereken hoeveel "+n+" in totaal terugbetaalt.\nb. Bereken de kosten van de lening.\nc. Bereken hoeveel procent van het geleende bedrag de kosten zijn. Rond af op 1 decimaal.",
    fig:fig,delen:[{l:"a",ant:tot,soort:"euro"},{l:"b",ant:k,soort:"euro"},{l:"c",ant:p,soort:"procent"}],
    formule:"a. maandtermijn × aantal maanden; b. totaal terugbetaald − geleend bedrag; c. kosten : geleend bedrag × 100",
    uitw:"a. "+t+" × "+m+" = "+eu(tot)+"; b. "+tot+" − "+b+" = "+eu(k)+"; c. "+k+" : "+b+" × 100 = "+pc(p)};},
function(){var n=pick(NAMEN),m=pick([10,12,20,24]),b=m*rnd(4,15)*10,afl=b/m,ren=rnd(3,12)+pick([0,0.5]),t=rd(afl+ren,2);
  return {p:"2.3",k:KOP.bank,v:n+" leent "+eu(b)+" en lost dat in "+m+" maanden af, elke maand een even groot deel. De maandtermijn is "+e2(t)+"."+BRON+"a. Bereken de aflossing per maand.\nb. Bereken hoeveel rente "+n+" per maand betaalt.\nc. Bereken de kosten van de hele lening.",
    delen:[{l:"a",ant:afl,soort:"euro"},{l:"b",ant:ren,soort:"euro"},{l:"c",ant:rd(ren*m,2),soort:"euro",alt:[rd(t*m-b,2)]}],
    formule:"aflossing per maand = geleend bedrag : aantal maanden; rente per maand = maandtermijn − aflossing; kosten = rente per maand × aantal maanden (of: termijn × maanden − geleend)",
    uitw:"a. "+b+" : "+m+" = "+e2(afl)+"; b. "+getalNL(t,2)+" − "+getalNL(afl,2)+" = "+e2(ren)+"; c. "+getalNL(ren,2)+" × "+m+" = "+e2(ren*m)};},
function(){var n=pick(NAMEN),ding=pick(["een scooter","een laptop","een e-bike","een gitaar"]),prijs=rnd(8,30)*50,mt=pick([6,10,12]),t=rd(prijs*(1+pick([6,8,10,12])/100)/mt,2);t=Math.ceil(t*2)/2;
  var tot=rd(t*mt,2),k=rd(tot-prijs,2),p=rd(k/prijs*100,1);
  return {p:"2.3",k:KOP.proc,v:n+" koopt "+ding+" van "+eu(prijs)+" op afbetaling: "+mt+" maanden lang "+e2(t)+" per maand."+BRON+"a. Bereken de kosten van deze lening.\nb. Bereken hoeveel procent dat is van de prijs. Rond af op 1 decimaal.",
    delen:[{l:"a",ant:k,soort:"euro"},{l:"b",ant:p,soort:"procent"}],formule:"kosten = termijn × aantal maanden − prijs; procent = kosten : prijs × 100",
    uitw:"a. "+getalNL(t,2)+" × "+mt+" = "+e2(tot)+"; − "+prijs+" = "+e2(k)+"; b. "+getalNL(k,2)+" : "+prijs+" × 100 = "+pc(p)};},

/* ---------- 2.4 Verzekeren ---------- */
function(){var n=pick(NAMEN),c=pick([
  function(){var ding=pick(["laptop","telefoon","fiets","e-bike","spelcomputer"]),S=rnd(25,140)*10,E=pick([50,75,100,150,250]),v=Math.max(0,S-E);
    return {v:"De "+ding+" van "+n+" is gestolen. De schade is "+eu(S)+". De verzekering heeft een eigen risico van "+eu(E)+"."+BRON+"Bereken hoeveel schadevergoeding "+n+" krijgt.",ant:v,soort:"euro",
      formule:"schadevergoeding = schade − eigen risico",uitw:S+" − "+E+" = "+eu(v)};},
  function(){var pm=pick([4.5,6,7.25,8.5,9.75,11]),E=pick([50,100,150]),S=rnd(30,120)*10,jp=rd(pm*12,2),zelf=rd(jp+E,2);
    return {v:n+" heeft een inboedelverzekering. De premie is "+e2(pm)+" per maand en het eigen risico is "+eu(E)+". Dit jaar heeft "+n+" één keer schade van "+eu(S)+"."+BRON+"a. Bereken hoeveel premie "+n+" per jaar betaalt.\nb. Bereken hoeveel schadevergoeding "+n+" krijgt.\nc. Bereken hoeveel "+n+" dit jaar in totaal zelf betaalt (premie + eigen risico)."+RO2A,
      delen:[{l:"a",ant:jp,soort:"euro"},{l:"b",ant:S-E,soort:"euro"},{l:"c",ant:zelf,soort:"euro"}],formule:"premie per jaar = premie per maand × 12; vergoeding = schade − eigen risico; zelf betaald = premie per jaar + eigen risico",
      uitw:"a. "+getalNL(pm,2)+" × 12 = "+e2(jp)+"; b. "+S+" − "+E+" = "+eu(S-E)+"; c. "+getalNL(jp,2)+" + "+E+" = "+e2(zelf)};}
  ])();
  c.p="2.4";c.k=KOP.eig;return c;},
function(){var n=pick(NAMEN),pA=pick([9,9.5,10,11,12]),pB=rd(pA-pick([2,2.5,3,3.5]),2),E=pick([100,150,200,250]),S=rnd(40,150)*10;
  var A=rd(pA*12,2),B=rd(pB*12+E,2);
  return {p:"2.4",k:KOP.prem,v:n+" kan kiezen uit twee fietsverzekeringen:\nVerzekering A: "+e2(pA)+" premie per maand, geen eigen risico.\nVerzekering B: "+e2(pB)+" premie per maand, "+eu(E)+" eigen risico.\nStel: de fiets van "+n+" wordt dit jaar één keer gestolen (schade "+eu(S)+")."+BRON+"a. Bereken hoeveel "+n+" dit jaar in totaal zelf betaalt bij verzekering A.\nb. Bereken hoeveel "+n+" dit jaar in totaal zelf betaalt bij verzekering B (premie + eigen risico)."+RO2A,
    delen:[{l:"a",ant:A,soort:"euro"},{l:"b",ant:B,soort:"euro"}],formule:"A: premie per maand × 12; B: premie per maand × 12 + eigen risico",
    uitw:"a. "+getalNL(pA,2)+" × 12 = "+e2(A)+"; b. "+getalNL(pB,2)+" × 12 = "+e2(pB*12)+"; + "+E+" = "+e2(B)};},
function(){var k=rnd(8,25)*1000,pj=pick([60,72,84,90,96,108]),sch=Math.round(k*pick([2,3,4,5])/100),gem=rnd(18,40)*50;
  var inn=k*pj,uit=sch*gem,over=inn-uit;
  return {p:"2.4",k:KOP.eig,v:"Een verzekeraar heeft "+getalNL(k)+" klanten met een fietsverzekering. Elke klant betaalt "+eu(pj)+" premie per jaar. Dit jaar worden er "+getalNL(sch)+" fietsen gestolen. Voor elke fiets betaalt de verzekeraar gemiddeld "+eu(gem)+" schadevergoeding."+BRON+"a. Bereken hoeveel premie de verzekeraar in totaal ontvangt.\nb. Bereken hoeveel schadevergoeding de verzekeraar in totaal betaalt.\nc. Bereken hoeveel de verzekeraar overhoudt (of tekortkomt: schrijf dan een min ervoor).",
    delen:[{l:"a",ant:inn,soort:"euro"},{l:"b",ant:uit,soort:"euro"},{l:"c",ant:over,soort:"euro"}],formule:"premie totaal = klanten × premie; schade totaal = aantal gestolen fietsen × gemiddelde vergoeding; over = premie totaal − schade totaal",
    uitw:"a. "+k+" × "+pj+" = "+eu(inn)+"; b. "+sch+" × "+gem+" = "+eu(uit)+"; c. "+inn+" − "+uit+" = "+eu(over)};}
];
