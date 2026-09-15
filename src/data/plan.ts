import type { Day, Localized } from './types.ts'

const t = (it: string, en: string): Localized => ({ it, en })

/** Ingredients that show up on several days — declared once, reused below. */
const fruit = {
  qty: '150 g',
  name: t('frutta fresca', 'fresh fruit'),
  hint: t('1 frutto grande o 2 piccoli', '1 large or 2 small pieces'),
}
const oil2 = {
  qty: '20 g',
  name: t('olio extravergine di oliva', 'extra virgin olive oil'),
  hint: t('2 cucchiai', '2 tablespoons'),
}
const bread50 = {
  qty: '50 g',
  name: t('pan bauletto al grano duro', 'durum wheat sandwich bread'),
  hint: t('2 fette per tramezzino', '2 sandwich slices'),
  alternatives: [{ qty: '40 g', name: t('Wasa Original', 'Wasa Original crispbread') }],
}
const nutButter = {
  qty: '20 g',
  name: t('burro di arachidi', 'peanut butter'),
  hint: t('o altra crema 100% frutta secca', 'or any other 100% nut butter'),
}
const veg200 = {
  qty: '200 g',
  name: t('verdure o ortaggi', 'vegetables'),
}
const proteinShake = {
  qty: '30 g',
  name: t('proteine whey isolate', 'whey isolate protein'),
  hint: t('1 misurino', '1 scoop'),
}
const vanillaPot = {
  qty: '200 g',
  name: t('crema proteica alla vaniglia', 'vanilla protein pudding'),
  hint: t('un vasetto', 'one pot'),
}

export const plan: Day[] = [
  {
    id: 'mon',
    meals: {
      breakfast: {
        items: [
          bread50,
          {
            qty: '60 g',
            name: t('fesa di tacchino', 'sliced turkey breast'),
            alternatives: [{ qty: '40 g', name: t('bresaola', 'bresaola') }],
          },
          fruit,
        ],
        note: t(
          'Colazione a scelta tra: tè con biscotti e 10 g di frutta secca; tè con tramezzino con philadelphia o ricotta e marmellata; tè con tramezzino con crema 100% nocciola (o altra frutta secca che preferisci).',
          'Pick one: tea with biscuits and 10 g of nuts; tea with a sandwich with cream cheese or ricotta and jam; tea with a sandwich with 100% hazelnut butter (or another nut butter you prefer).',
        ),
      },
      morningSnack: {
        items: [{ qty: '30 g', name: t('frutta secca', 'nuts') }],
      },
      lunch: {
        items: [
          { qty: '200 g', name: t('bistecca di manzo', 'beef steak') },
          {
            ...veg200,
            hint: t('quantità minima', 'minimum amount'),
            alternatives: [
              { qty: '70 g', name: t('insalata', 'salad'), hint: t('una ciotola', 'one bowl') },
            ],
          },
          oil2,
          fruit,
        ],
        note: t(
          'Puoi sempre invertire i pranzi con le cene, e aggiungere qualsiasi spezia come curry o zafferano. Farro, riso o pasta con verdure e legumi: i legumi possono essere frullati con un po’ di acqua di cottura per ottenere una crema con cui condire la pasta.',
          'You can always swap lunches with dinners, and add any spice such as curry or saffron. Spelt, rice or pasta with vegetables and pulses: the pulses can be blended with a little cooking water into a cream to dress the pasta.',
        ),
      },
      afternoonSnack: { items: [vanillaPot] },
      dinner: {
        items: [
          { qty: '100 g', name: t('pasta di semola', 'durum wheat pasta') },
          { qty: '240 g', name: t('lenticchie in scatola', 'canned lentils') },
          {
            ...veg200,
            hint: t('quantità minima', 'minimum amount'),
            alternatives: [
              { qty: '70 g', name: t('insalata', 'salad'), hint: t('una ciotola', 'one bowl') },
            ],
          },
          oil2,
        ],
      },
    },
  },

  {
    id: 'tue',
    meals: {
      breakfast: {
        items: [fruit, { qty: '30 g', name: t('frutta secca', 'nuts') }],
      },
      lunch: {
        items: [
          veg200,
          {
            qty: '220 g',
            name: t('uova di gallina', 'eggs'),
            hint: t('4 uova', '4 eggs'),
          },
          oil2,
          {
            qty: '50 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            hint: t('5 fette', '5 slices'),
          },
          fruit,
        ],
        note: t(
          'Farro, orzo o grano saraceno con mix di verdure e parmigiano. In alternativa pasta al pomodoro o al pesto con verdura. Più frutta.',
          'Spelt, barley or buckwheat with mixed vegetables and Parmigiano. Or pasta with tomato or pesto plus vegetables. Plus fruit.',
        ),
      },
      afternoonSnack: {
        items: [proteinShake],
        note: t(
          'Sciogli un misurino di proteine whey isolate in acqua o in una bevanda vegetale per ottenere un frullato.',
          'Dissolve one scoop of whey isolate protein in water or a plant drink to make a shake.',
        ),
      },
      dinner: {
        items: [
          {
            ...veg200,
            alternatives: [
              { qty: '80 g', name: t('insalata', 'salad'), hint: t('una ciotola', 'one bowl') },
            ],
          },
          { qty: '100 g', name: t('riso basmati', 'basmati rice') },
          { qty: '100 g', name: t('salmone', 'salmon'), hint: t('tartare', 'tartare') },
          {
            qty: '10 g',
            name: t('olio extravergine di oliva', 'extra virgin olive oil'),
            hint: t('1 cucchiaio', '1 tablespoon'),
          },
        ],
      },
    },
  },

  {
    id: 'wed',
    meals: {
      breakfast: { items: [bread50, nutButter, fruit] },
      lunch: {
        items: [
          { qty: '100 g', name: t('riso di konjac', 'konjac rice') },
          { ...veg200, hint: t('es. pomodorini', 'e.g. cherry tomatoes') },
          {
            qty: '100 g',
            name: t('primo sale', 'primo sale cheese'),
            alternatives: [{ qty: '100 g', name: t('scamorza', 'scamorza cheese') }],
          },
          {
            qty: '40 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            hint: t('4 fette', '4 slices'),
          },
          oil2,
          fruit,
        ],
      },
      afternoonSnack: { items: [vanillaPot] },
      dinner: {
        items: [
          { qty: '250 g', name: t('petto di pollo', 'chicken breast') },
          veg200,
          {
            qty: '100 g',
            name: t('pane integrale', 'wholegrain bread'),
            alternatives: [{ qty: '80 g', name: t('Wasa Original', 'Wasa Original crispbread') }],
          },
          oil2,
        ],
        note: t(
          'In alternativa al piatto di verdura va bene anche una vellutata di verdure di stagione.',
          'Instead of a plate of vegetables, a seasonal vegetable soup works just as well.',
        ),
      },
    },
  },

  {
    id: 'thu',
    meals: {
      breakfast: { items: [bread50, nutButter, fruit] },
      morningSnack: { items: [{ qty: '20 g', name: t('frutta secca', 'nuts') }] },
      lunch: {
        items: [
          {
            qty: '120 g',
            name: t('bresaola', 'bresaola'),
            alternatives: [{ qty: '120 g', name: t('prosciutto crudo', 'prosciutto crudo') }],
          },
          {
            qty: '70 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            alternatives: [{ qty: '90 g', name: t('pane integrale', 'wholegrain bread') }],
          },
          {
            ...veg200,
            alternatives: [
              { qty: '100 g', name: t('insalata', 'salad'), hint: t('una ciotola', 'one bowl') },
            ],
          },
          oil2,
        ],
      },
      afternoonSnack: { items: [proteinShake] },
      dinner: {
        items: [
          {
            qty: '80 g',
            name: t('pasta di semola', 'durum wheat pasta'),
            alternatives: [{ qty: '80 g', name: t('riso basmati', 'basmati rice') }],
          },
          { qty: '240 g', name: t('lenticchie in scatola', 'canned lentils') },
          {
            ...veg200,
            hint: t('quantità minima', 'minimum amount'),
            alternatives: [
              { qty: '70 g', name: t('insalata', 'salad'), hint: t('una ciotola', 'one bowl') },
            ],
          },
          oil2,
        ],
      },
    },
  },

  {
    id: 'fri',
    meals: {
      breakfast: { items: [bread50, nutButter, fruit] },
      lunch: {
        items: [
          { qty: '100 g', name: t('riso di konjac', 'konjac rice') },
          { ...veg200, hint: t('es. pomodorini', 'e.g. cherry tomatoes') },
          { qty: '100 g', name: t('mozzarella proteica', 'high-protein mozzarella') },
          {
            qty: '40 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            hint: t('4 fette', '4 slices'),
          },
          oil2,
          fruit,
        ],
      },
      afternoonSnack: { items: [vanillaPot] },
      dinner: {
        items: [
          { qty: '100 g', name: t('pasta di semola', 'durum wheat pasta') },
          veg200,
          { qty: '250 g', name: t('petto di pollo', 'chicken breast') },
          oil2,
        ],
        note: t(
          'Pasta con sugo di peperoni o pesto di rucola, più petto di pollo con verdure.',
          'Pasta with pepper sauce or rocket pesto, plus chicken breast with vegetables.',
        ),
      },
    },
  },

  {
    id: 'sat',
    meals: {
      breakfast: {
        items: [
          bread50,
          {
            qty: '60 g',
            name: t('fesa di tacchino', 'sliced turkey breast'),
            alternatives: [{ qty: '40 g', name: t('bresaola', 'bresaola') }],
          },
          fruit,
        ],
      },
      lunch: {
        items: [
          { qty: '100 g', name: t('riso di konjac', 'konjac rice') },
          { ...veg200, hint: t('es. pomodorini', 'e.g. cherry tomatoes') },
          { qty: '250 g', name: t('lenticchie in scatola', 'canned lentils') },
          oil2,
          fruit,
        ],
      },
      afternoonSnack: { items: [proteinShake] },
      dinner: {
        items: [],
        free: true,
        note: t(
          'Il piano non prevede una cena fissa per oggi: è il pasto libero della settimana.',
          'The plan has no fixed dinner today: this is the free meal of the week.',
        ),
      },
    },
  },

  {
    id: 'sun',
    meals: {
      breakfast: { items: [fruit, { qty: '30 g', name: t('frutta secca', 'nuts') }] },
      morningSnack: {
        items: [proteinShake],
        note: t('Da bere come frullato.', 'Drink it as a shake.'),
      },
      lunch: {
        items: [
          { qty: '120 g', name: t('pasta di semola integrale', 'wholewheat durum pasta') },
          veg200,
          oil2,
          { qty: '25 g', name: t('parmigiano reggiano', 'Parmigiano Reggiano') },
        ],
        note: t(
          'Pasta con mix di verdure, pomodoro o pesto, con parmigiano e verdura a parte.',
          'Pasta with mixed vegetables, tomato or pesto, with Parmigiano and vegetables on the side.',
        ),
      },
      afternoonSnack: { items: [vanillaPot] },
      dinner: {
        items: [
          {
            qty: '100 g',
            name: t('insalata', 'salad'),
            hint: t('una ciotola', 'one bowl'),
            alternatives: [{ qty: '200 g', name: t('verdure o ortaggi', 'vegetables') }],
          },
          { qty: '220 g', name: t('uova di gallina', 'eggs'), hint: t('4 uova', '4 eggs') },
          {
            qty: '50 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            hint: t('5 fette', '5 slices'),
          },
          oil2,
          fruit,
        ],
        note: t(
          'Insalatona con tonno e un legume a scelta, più mix di verdure. Per zuppe e minestroni: minestrone o vellutata con verdura a piacere (zucca, zucchine, cipolle, carote, cavolo nero…) più patata (120-130 g) oppure riso (2-3 cucchiai) e legumi (100 g pesati cotti, 4 cucchiai). Oppure minestrina in brodo vegetale o di carne con 30 g di pastina o riso e una piccola porzione di secondo. Aggiungi sempre un contorno di verdura con un filo d’olio extravergine a crudo.',
          'A big salad with tuna and a pulse of your choice, plus mixed vegetables. For soups: minestrone or velouté with any vegetables (pumpkin, courgettes, onions, carrots, black kale…) plus potato (120-130 g) or rice (2-3 tablespoons) and pulses (100 g cooked weight, 4 tablespoons). Or a light broth soup (vegetable or meat) with 30 g of small pasta or rice and a small portion of a main. Always add a vegetable side with a drizzle of raw extra virgin olive oil.',
        ),
      },
    },
  },
]
