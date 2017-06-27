
Leírás

Bevezetés
A cél, hogy a leltárba vett eszközök adataitl egyszerűen listázni tudjuk, kiderüljön, mikor kinél volt, hiányzó eszköz esetén lássuk, kinél van, sérült vagy hibás eszköz esetén kiderüljön, kinél volt utoljára.

Ehhez Először meg kell oldani az eszközök felvételét a leltárba. Eszköztípusonként eltérő adatokat tárolunk róluk, ezért típustól függően más adatbeviteli mezőknek kell megjelennie felvitelkor (Pl. egy notebook esetén érdemes tárolni a processzor típusát is, szék esetében ez az adat viszont nem értelmezhető).

Az eszközök részletes adatainak tárolását indokolja az a gyakorlati példa, miszerint jelentkezik egy eszköz kivételére jogosult személy, típustól függő elvárásokkal. Pl. kifejezett kérése, hogy fehér legyen a kívánt notebook sok memóriával, vagy piros színű széket szeretne, stb. A javasolt struktúrával megvalósítható a kivételezésre ajánlható eszközök közötti célirányos keresés.

Fontos, hogy kiderüljön, ki vette leltárba az adott eszközt, és le tudjuk kérni az elérhetőségét. Valamint az is lényeges, hogy csak bizonyos felhasználók tudják elvégezni a kiadás/visszavét/leltárbavétel folyamatát, amihez felhasználói fiókokra van szükség. Később szükség lesz több felhasználói fiókra is, különböző jogosultságokkal, melyeket érdemes már a projekt elején tisztázni.

Jogosultsági szintek:
root → korlátlan jogok (a szerver beállításai felett is)
admin → új felhasználói fiókot tud létrehozni, tud rögzíteni kiadást, visszavétet, tud létrehozni új visitor, és user fiókot, tud kiadni/visszavételezni, selejtezni, módosítani
visitor → meg tudja nézni milyen kiadható eszközök vannak leltárba vételezve, milyen személyeknek adhatóak ki, meg tudja nézni, hogy az adott eszköz kinél van… DE adatrögzítést, módosítást nem tud végrehajtani
raktaros → Tud kiadni, visszavételezni eszközt, új eszközt felvenni a leltárba, selejtezni, módosítani, usert regisztrálni.
user → Csak a leltár szerint nála lévő eszközök listáját tudja megnézni (eszköz adatlapját is)

Funkciók

Új tárgyi eszköz nyilvántartásba vétele:
Tárgyi eszköz típusa (legördülő menüből kiválasztható: notebook, PC, Telefon, szék, egyéb, stb.)  → kiválasztott típustól függően jelenik meg egy űrlap (form), amit ki kell tölteni a nyilvántartásba vételhez

Notebook típusú tárgyi eszköz nyilvántartásba vétele:
ID (auto_increment) → nem kell kitölteni
Nyilvántartási szám → Általában ez egy plusz vonalkód a belső rendszerben történő azonosításhoz
Vonalkód száma
Elnevezés (Pl. szürke Samsung) → másodlagos beazonosításhoz
Gyártó vállalat (Samsung, Asus, Lenovo, stb.)
Gyártás éve
Gyártási szám (SN)
Beszerzés ideje
Üzembehelyezés dátuma
Beszerzési ár (Ft)
Amortizáció évente ( % )
Segédlet amortizáció számolásához:
http://www.tankonyvtar.hu/hu/tartalom/tamop412A/0007_c3_1065_1067_szamvitelalapjai_scorm/8_4_1_ertekcsokkenes_ertekcsokkenesi_leiras_6gpTPorDaSmaYIPr.html
Fizikai adatok (táblázat):
  - CPU:(neve, alapórajele)
  - RAM (mérete, órajele)
  - Háttértár (típusa - HDD/SSD/SSHD -, mérete) → több is felvihető legyen
  - VGA (dedikált/integrált, név, méret)
  - kijelző (méret, IPS/TN, LCD/LED_LCD, matt/fényes)
  - Szín (szürke, fekete, fehér, stb.)
  - Billentyűzet kiosztása (magyar, angol, orosz, stb.)
Kép feltöltése (tömörítés, montázs készítése szerveroldalról legyen megoldva)



Későbbi adatkezelés


módosítás (minden típusra):
Vonalkód leolvasására, vagy kereséssel történő kiválasztással megnyitható legyen az eszköz adatlapja
ID
Módosítás leírása (felújítás, alkatrészcsere, érték újrabecslése, stb.)
Új aktuális érték (Ha csak a tárgyi eszköz megnevezése lett módosítva pl. akkor üresen hagyható, ebben az esetben marad az érték)
Pl. Sérült a szék kárpítja, ezért romlott az értéke, de a leselejtezés még nem szükséges

Leselejtezés, eladás, csere (minden típusra)
ID
Leselejtezés dátuma
oka (elavult, elromlott, elszublimált, stb.)
Leírás (Pl. garanciában cserélve másik készülékre;  Leselejtezve, eladva XY-nak Z Ft-ért)
Megjegyzés: garanciális csere esetén az adott készülék “selejtezésre” kerül, a cserekészülék újként lesz felvéve az adatbázisba

Kiadás:
dátum (szerveridő szerint)
Ki adta ki  → adatrögzítő személy bejelentkezésekor indított sessionből kiolvassuk a userid-t
Kinek adta ki (listából lehessen választani a lehetséges kölcsönzők közül)
Várható visszaérkezés
Leírás a kiadáskor ismert hibákról, sérülésekről
Kép

Visszavét:
dátum (szerveridő szerint)
Ki vette vissza (bejelentkezett adatrögzítő userid-je)
Ki hozta vissza → Ha nem az hozza vissza, aki elvitte (továbbadás esetén a sérülésekért az a felelős, aki eredetileg elvitte)
leírás a visszavétkor ismert hibákról, sérülésekről
Kép




Egyéb funkciók:

(esetleg a rögzítő eszköz típusát is érdemes lehet rögzíteni)
https://github.com/darcyclarke/Detect.js   → navigator.userAgent javascript

Érdemes gyorsítani a kiadás/visszavét folyamatát automatikus vonalkódolvasással:
Segédlet a mobileszköz kamerájának használatához, és a vonalkódfelismeréshez
http://a.kabachnik.info/a-javascript-barcode-reader-with-bootstrap-3-and-quaggajs.html
https://coder-node.blogspot.hu/2015/10/scan-barcode-with-device-camera-from.html
