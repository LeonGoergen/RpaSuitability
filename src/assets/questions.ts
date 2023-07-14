import { QuestionInterface } from './question-interface';

export const questions: QuestionInterface[] = [
  {
    id: 1,
    question: 'Gibt es in Ihrem Unternehmen Prozesse, die regelmäßig und nach festen Regeln ablaufen?',
    explanation: 'Robotic Process Automation (RPA) ist besonders nützlich für Prozesse, die strukturiert sind und nach festen Regeln ablaufen. Solche Prozesse können leicht von einem Roboter übernommen werden, da sie vorhersehbar sind und wenig menschliche Entscheidungsfindung erfordern. Wenn es in Ihrem Unternehmen solche regelmäßigen und regelbasierten Prozesse gibt, dann könnte RPA eine sinnvolle Lösung für Sie sein. Diese Prozesse könnten beispielsweise die regelmäßige Erfassung von Daten, die Durchführung von Berechnungen oder die Einreichung von Berichten sein.',
    subQuestions: [
      'Gibt es Prozesse in Ihrem Unternehmen, die regelmäßig wiederholt werden?',
      'Sind diese Prozesse strukturiert und folgen sie klaren Regeln?',
      'Erfordern diese Prozesse wenig menschliche Entscheidungsfindung?'
    ],
    weight: 9
  },
  {
    id: 2,
    question: 'Nutzen diese Prozesse digitale Anwendungen und Daten?',
    explanation: 'Diese Frage zielt darauf ab, zu verstehen, ob der zu automatisierende Prozess bereits digitalisiert ist, d.h., ob er digitale Werkzeuge, Anwendungen oder Datenbanken verwendet. Robotic Process Automation (RPA) ist besonders effektiv bei der Automatisierung von digitalen Prozessen. Wenn Ihr Prozess bereits digitale Komponenten hat, könnte er ein guter Kandidat für RPA sein. Denken Sie dabei an Softwareanwendungen, die Sie verwenden, Dateien, die elektronisch gespeichert werden, oder Online-Formulare, die ausgefüllt werden müssen.',
    subQuestions: [
      'Verwenden Sie Softwareanwendungen in Ihrem Prozess?',
      'Werden wichtige Dateien oder Daten für den Prozess elektronisch gespeichert?',
      'Sind irgendwelche Teile des Prozesses online oder auf einer digitalen Plattform?'
    ],
    weight: 10
  },
  {
    id: 3,
    question: 'Erfahren diese Anwendungen keine bis wenig Aktualisierungen?',
    explanation: 'Diese Frage zielt darauf ab, zu bewerten, wie stabil Ihre Softwareanwendungen oder digitalen Plattformen sind. Robotic Process Automation (RPA) arbeitet am besten mit Anwendungen, die stabil sind und nur wenige Aktualisierungen erfahren. Häufige Aktualisierungen können die Funktionalität von RPA stören, da die Automatisierungsprogramme auf bestimmte Benutzeroberflächen oder Funktionen abgestimmt sind. Wenn diese häufig geändert werden, müssen auch die RPA-Skripte häufig angepasst werden, was den Wartungsaufwand erhöht.',
    subQuestions: [
      'Werden die von Ihnen verwendeten Softwareanwendungen selten aktualisiert?',
      'Haben diese Aktualisierungen erhebliche Auswirkungen auf die Benutzeroberfläche oder Funktionen, die Sie verwenden?',
      'Benötigen Sie kaum Zeit und Ressourcen, um Ihre Prozesse an Softwareaktualisierungen anzupassen?'
    ],
    weight: 7,
    dependsOn: 2
  },
  {
    id: 4,
    question: 'Sind diese Daten leicht zugänglich?',
    explanation: 'Die Frage zielt darauf ab, zu verstehen, ob die Daten, die in Ihrem Prozess verwendet werden, leicht zugänglich sind. Robotic Process Automation (RPA) arbeitet effizienter, wenn die benötigten Daten ohne größere Hindernisse abgerufen werden können. Dies könnte bedeuten, dass die Daten in einer strukturierten Form (z.b. Tabellen) vorliegen, dass sie ohne spezielle Berechtigungen zugänglich sind oder dass sie nicht hinter komplizierten Benutzeroberflächen verborgen sind. Eine einfache Zugänglichkeit der Daten erleichtert die Implementierung und Effizienz von RPA.',
    subQuestions: [
      'Sind die Daten, die Ihr Prozess benötigt, strukturiert und organisiert?',
      'Sind die Daten leicht zu finden oder sind sie hinter komplizierten Benutzeroberflächen verborgen?'
    ],
    weight: 4,
  },
  {
    id: 5,
    question: 'Liegt bei diesen Prozessen ein hohes zu verarbeitendes Daten- oder Prozessvolumen vor?',
    explanation: 'Diese Frage zielt darauf ab, das Volumen der Daten oder Prozesse zu ermitteln, die in Ihrem Unternehmen verarbeitet werden müssen. Robotic Process Automation (RPA) ist besonders nützlich für Prozesse, die hohe Volumina an Daten oder Transaktionen verarbeiten müssen. Ein "hohes Volumen" kann dabei unterschiedlich definiert werden, je nach Art und Größe des Unternehmens, aber typischerweise sind dies Aufgaben, die täglich oder sogar stündlich wiederholt werden und eine große Menge an Informationen betreffen.',
    subQuestions: [
      'Sind typischerweise viele Datenpunkte oder Transaktionen in einem einzigen Durchlauf dieses Prozesses beteiligt?',
      'Arbeitet der Prozess mit einer großen Menge an Informationen oder Daten?'
    ],
    weight: 5,
  },
  {
    id: 6,
    question: 'Sind viele Mitarbeiter an dem zu automatisierenden Prozess beteiligt?',
    explanation: 'Diese Frage soll feststellen, wie viele Personen in das Ausführen des zu automatisierenden Prozesses involviert sind. Je mehr Personen beteiligt sind, desto komplexer kann der Prozess sein und desto mehr Zeit könnte durch die Automatisierung eingespart werden. Ein Prozess, an dem viele Mitarbeiter beteiligt sind, könnte sich für RPA eignen, da hierdurch die manuellen Arbeitsaufwände reduziert und die Effizienz gesteigert werden könnte. Denken Sie dabei an Prozesse, die von verschiedenen Abteilungen, Teams oder sogar Standorten durchgeführt werden.',
    subQuestions: [
      'Sind mehrere Teams, Abteilungen oder Standorte an der Durchführung des Prozesses beteiligt?',
      'Gibt es eine hohe Personalfluktuation im Prozess aufgrund von Monotonie oder Arbeitsbelastung?'
    ],
    weight: 1,
  },
  {
    id: 7,
    question: 'Ist die Variation der verschiedenen Prozessausgänge niedrig?',
    explanation: 'Diese Frage prüft, ob der Ausgang des Prozesses, den Sie automatisieren möchten, vorhersehbar und konsistent ist. Robotic Process Automation (RPA) ist besonders gut geeignet für Prozesse, die zu vorhersagbaren und gleichbleibenden Ergebnissen führen. Wenn die Variationen in den Ausgängen Ihres Prozesses niedrig sind (d.h. die Ergebnisse sind in der Regel gleich oder sehr ähnlich), könnte RPA eine geeignete Lösung für Sie sein.',
    subQuestions: [
      'Führt der Prozess in der Regel zu einem gleichbleibenden oder vorhersagbaren Ergebnis?',
      'Gibt es wenige Ausnahmen oder unvorhersehbare Ergebnisse in dem Prozess, den Sie automatisieren möchten?'
    ],
    weight: 8,
  },
  {
    id: 8,
    question: "Sind diese Prozesse sehr fehleranfällig?",
    explanation: "Robotic Process Automation (RPA) kann dazu beitragen, die Genauigkeit von Prozessen zu erhöhen und Fehler zu reduzieren, besonders wenn diese Prozesse repetitive und datenintensive Aufgaben beinhalten. Daher könnte die Verwendung von RPA besonders nützlich sein, wenn Ihre Prozesse anfällig für menschliche Fehler sind. Denken Sie bei dieser Frage an die Fehlerquote in Ihren Prozessen.",
    subQuestions: [
      "Haben Ihre Prozesse eine hohe Fehlerquote?",
      "Sind die Fehler in Ihren Prozessen überwiegend menschlicher Natur?"
    ],
    weight: 3
  },
  {
    id: 9,
    question: "Verarbeiten diese Prozesse sensible Daten?",
    explanation: "RPA kann dazu beitragen, die Sicherheit und Genauigkeit beim Umgang mit sensiblen Daten zu erhöhen, da Bots konsequent die vorgeschriebenen Sicherheitsprotokolle befolgen. Denken Sie bei dieser Frage an die Art der Daten, die sie verarbeiten und ob es strenge Sicherheitsprotokolle für den Umgang mit den in den Prozessen verwendeten Daten gibt.",
    subQuestions: [
      "Werden in Ihren Prozessen sensible Daten verarbeitet?",
      "Gibt es strenge Sicherheitsprotokolle für den Umgang mit den in den Prozessen verwendeten Daten?"
    ],
    weight: 3
  },
  {
    id: 10,
    question: 'Gibt es gesetzliche oder regulatorische Anforderungen für den Prozess?',
    explanation: 'Diese Frage zielt darauf ab zu ermitteln, ob Ihr Prozess gesetzlichen oder regulatorischen Anforderungen unterliegt. Einige Prozesse können strengen Regulierungen unterliegen, die bestimmte Aspekte des Prozesses beeinflussen, wie z.B. wie Daten gesammelt und gespeichert werden, oder wie bestimmte Aufgaben ausgeführt werden. Solche Anforderungen könnten die Implementierung von RPA beeinflussen und zusätzliche Kontrollen oder Schritte erfordern, um die Einhaltung zu gewährleisten. Dennoch kann RPA dazu beitragen, die Einhaltung von Vorschriften zu verbessern, indem es die Konsistenz von beispielsweise der Prozessdokumentation erhöht.',
    subQuestions: [
      'Muss Ihr Prozess bestimmte gesetzliche oder regulatorische Standards einhalten?',
      'Sind spezielle Berichte oder Dokumentationen für Ihren Prozess erforderlich?',
      'Gibt es spezielle Datenschutz- oder Datensicherheitsanforderungen für Ihren Prozess?'
    ],
    weight: 3,
  },
  {
    id: 11,
    question: 'Nutzen sie bereits andere Automatisierungstechnologien?',
    explanation: 'Diese Frage zielt darauf ab, zu ermitteln, ob Ihr Unternehmen bereits andere Formen der Automatisierung einsetzt. Die Verwendung anderer Automatisierungstechnologien kann darauf hindeuten, dass Ihr Unternehmen offen für technologische Innovationen ist und die Infrastruktur hat, um Automatisierungstechnologien zu unterstützen. Zudem könnte dies bedeuten, dass Ihr Unternehmen bereits Erfahrungen mit der Einführung und Integration neuer Technologien hat. Beispiele für andere Automatisierungstechnologien können sein: Workflow-Automatisierung, Automatisierung von Geschäftsprozessen, KI-Technologien usw.',
    subQuestions: [
      'Haben Sie bereits Workflow- oder Geschäftsprozessautomatisierungen implementiert?',
      'Nutzt Ihr Unternehmen KI-Technologien oder maschinelles Lernen in irgendeiner Form?',
      'Haben Sie Erfahrung mit der Einführung und Integration neuer Technologien?'
    ],
    weight: 2,
  },
  {
    id: 12,
    question: 'Liegt für den zu automatisierenden Prozessablauf bereits eine Prozessdokumentation vor?',
    explanation: 'Diese Frage prüft, ob es für den zu automatisierenden Prozess eine vorhandene Dokumentation gibt. Eine klare Prozessdokumentation ist entscheidend für die erfolgreiche Implementierung von Robotic Process Automation (RPA), da sie es ermöglicht, den Prozess in seinen Einzelteilen zu verstehen und zu erkennen, welche Teile automatisiert werden können. Wenn eine solche Dokumentation bereits existiert, kann dies den Übergang zu RPA erheblich erleichtern. Wenn keine Dokumentation vorliegt, bedeutet das nicht zwangsläufig, dass RPA nicht geeignet ist, es könnte jedoch zusätzliche Arbeit notwendig sein, um den Prozess vollständig zu verstehen und zu dokumentieren.',
    subQuestions: [
      'Ist der Prozessablauf in einer beispielsweise schriftlichen oder digitalen Form dokumentiert?',
      'Ist die Dokumentation detailliert genug, um den gesamten Prozess zu verstehen?',
      'Wurde die Dokumentation regelmäßig aktualisiert und spiegelt sie den aktuellen Prozessablauf wider?'
    ],
    weight: 2,
  },
  {
    id: 13,
    question: 'Wird in dem Prozess nur eine Sprache benötigt?',
    explanation: 'Diese Frage zielt darauf ab, zu bestimmen, ob der Prozess, den Sie automatisieren möchten, den Umgang mit mehreren Sprachen erfordert. Das kann zum Beispiel bedeuten, dass Daten in verschiedenen Sprachen verarbeitet werden müssen, Kommunikation auf mehreren Sprachen stattfindet oder die Benutzerinterface von verwendeten Softwares in verschiedenen Sprachen eingestellt sein muss. RPA kann solche Mehrsprachigkeitsanforderungen oft nicht effizient genug handhaben. Wenn Ihr Prozess mehrere Sprachen benötigt, kann dies die Implementierung von RPA erschweren. Zudem ist die Fähigkeit, Dokumente unternehmensgerechte zu übersetzen, eine Herausforderung für RPA.',
    subQuestions: [
      'Erfordert Ihr Prozess Kommunikation in mehreren Sprachen?',
      'Muss die Benutzeroberfläche von verwendeten Softwares in verschiedenen Sprachen eingestellt sein?'
    ],
    weight: 1,
  },
];
