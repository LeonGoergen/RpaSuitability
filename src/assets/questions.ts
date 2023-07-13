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
    question: 'Nutzt der Prozess digitale Anwendungen und Daten?',
    explanation: 'Diese Frage zielt darauf ab, zu verstehen, ob der zu automatisierende Prozess bereits digitalisiert ist, d.h., ob er digitale Werkzeuge, Anwendungen oder Datenbanken verwendet. Robotic Process Automation (RPA) ist besonders effektiv bei der Automatisierung von digitalen Prozessen. Wenn Ihr Prozess bereits digitale Komponenten hat, könnte er ein guter Kandidat für RPA sein. Denken Sie dabei an Softwareanwendungen, die Sie verwenden, Dateien, die elektronisch gespeichert werden, oder Online-Formulare, die ausgefüllt werden müssen.',
    subQuestions: [
      'Verwenden Sie Softwareanwendungen in Ihrem Prozess?',
      'Werden wichtige Dateien oder Daten für den Prozess elektronisch gespeichert?',
      'Sind irgendwelche Teile des Prozesses online oder auf einer digitalen Plattform?'
    ],
    weight: 10
  },
];
