import type { Day, Localized } from './types.ts'

const t = (it: string, en: string): Localized => ({ it, en })

/* Ingredients that recur across the week — declared once, reused below. */

const fruit = {
  qty: '150 g',
  name: t('Frutta fresca', 'Fresh fruit'),
  hint: t('1 frutto grande o 2 piccoli', '1 large or 2 small pieces'),
}

const nuts30 = { qty: '30 g', name: t('Frutta secca', 'Nuts') }

const oil2 = {
  qty: '20 g',
  name: t('Olio extravergine di oliva', 'Extra virgin olive oil'),
  hint: t('2 cucchiai', '2 tablespoons'),
}

const oil1 = {
  qty: '10 g',
  name: t('Olio extravergine di oliva', 'Extra virgin olive oil'),
  hint: t('1 cucchiaio', '1 tablespoon'),
}

const breadOrWasa = {
  qty: '50 g',
  name: t('Pan bauletto al grano duro', 'Durum wheat sandwich bread'),
  hint: t('2 fette per tramezzino', '2 sandwich slices'),
  alternatives: [{ qty: '40 g', name: t('Wasa Original', 'Wasa Original crispbread') }],
}

const nutButter = {
  qty: '20 g',
  name: t('Burro di arachidi', 'Peanut butter'),
  alternatives: [{ qty: '20 g', name: t('Crema 100% frutta secca', '100% nut butter') }],
}

const veg200 = { qty: '200 g', name: t('Verdure o ortaggi', 'Vegetables') }

const vegOrSalad70 = {
  ...veg200,
  hint: t('Quantità minima', 'Minimum amount'),
  alternatives: [{ qty: '70 g', name: t('Insalata', 'Salad'), hint: t('Una ciotola', 'One bowl') }],
}

const proteinScoop = {
  qty: '30 g',
  name: t('Proteine whey isolate', 'Whey isolate protein'),
  hint: t('1 misurino', '1 scoop'),
}

const vanillaPot = {
  qty: '200 g',
  name: t('Crema proteica alla vaniglia', 'Vanilla protein pudding'),
  hint: t('Un vasetto', 'One pot'),
}

const turkeyOrBresaola = {
  qty: '60 g',
  name: t('Fesa di tacchino', 'Sliced turkey breast'),
  alternatives: [{ qty: '40 g', name: t('Bresaola', 'Bresaola') }],
}

const konjac = { qty: '100 g', name: t('Riso di konjac', 'Konjac rice') }

const cherryVeg = { ...veg200, hint: t('Es. pomodorini', 'E.g. cherry tomatoes') }

const lentils240 = { qty: '240 g', name: t('Lenticchie in scatola', 'Canned lentils') }

export const plan: Day[] = [
  {
    id: 'mon',
    meals: {
      breakfast: {
        items: [breadOrWasa, turkeyOrBresaola, fruit],
        swaps: [
          t('Tè con biscotti e 10 g di frutta secca', 'Tea with biscuits and 10 g of nuts'),
          t(
            'Tè con tramezzino, philadelphia o ricotta e marmellata',
            'Tea with a sandwich, cream cheese or ricotta and jam',
          ),
          t(
            'Tè con tramezzino e crema 100% nocciola, o un’altra crema di frutta secca',
            'Tea with a sandwich and 100% hazelnut butter, or another nut butter',
          ),
        ],
      },
      morningSnack: { items: [nuts30] },
      lunch: {
        items: [
          { qty: '200 g', name: t('Bistecca di manzo', 'Beef steak') },
          vegOrSalad70,
          oil2,
          fruit,
        ],
        tips: [
          t(
            'Puoi sempre scambiare il pranzo con la cena.',
            'You can always swap lunch with dinner.',
          ),
          t(
            'Aggiungi le spezie che preferisci, per esempio curry o zafferano.',
            'Add any spice you like, for example curry or saffron.',
          ),
          t(
            'Farro, riso o pasta con verdure e legumi.',
            'Spelt, rice or pasta with vegetables and pulses.',
          ),
          t(
            'Frulla i legumi con un po’ di acqua di cottura: diventano una crema per condire la pasta.',
            'Blend the pulses with a little cooking water: they turn into a cream to dress the pasta.',
          ),
        ],
      },
      afternoonSnack: { items: [vanillaPot] },
      dinner: {
        items: [
          { qty: '100 g', name: t('Pasta di semola', 'Durum wheat pasta') },
          lentils240,
          vegOrSalad70,
          oil2,
        ],
      },
    },
  },

  {
    id: 'tue',
    meals: {
      breakfast: { items: [fruit, nuts30] },
      lunch: {
        items: [
          veg200,
          { qty: '220 g', name: t('Uova di gallina', 'Eggs'), hint: t('4 uova', '4 eggs') },
          oil2,
          {
            qty: '50 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            hint: t('5 fette', '5 slices'),
          },
          fruit,
        ],
        tips: [
          t(
            'Farro, orzo o grano saraceno con verdure miste e parmigiano.',
            'Spelt, barley or buckwheat with mixed vegetables and Parmigiano.',
          ),
          t(
            'In alternativa, pasta al pomodoro o al pesto con le verdure.',
            'Or pasta with tomato or pesto and the vegetables.',
          ),
          t('Chiudi con la frutta.', 'Finish with the fruit.'),
        ],
      },
      afternoonSnack: {
        items: [proteinScoop],
        tips: [
          t(
            'Sciogli il misurino in acqua o in una bevanda vegetale.',
            'Dissolve the scoop in water or a plant drink.',
          ),
        ],
      },
      dinner: {
        items: [
          {
            ...veg200,
            alternatives: [
              { qty: '80 g', name: t('Insalata', 'Salad'), hint: t('Una ciotola', 'One bowl') },
            ],
          },
          { qty: '100 g', name: t('Riso basmati', 'Basmati rice') },
          { qty: '100 g', name: t('Salmone', 'Salmon'), hint: t('Tartare', 'Tartare') },
          oil1,
        ],
      },
    },
  },

  {
    id: 'wed',
    meals: {
      breakfast: { items: [breadOrWasa, nutButter, fruit] },
      lunch: {
        items: [
          konjac,
          cherryVeg,
          {
            qty: '100 g',
            name: t('Primo sale', 'Primo sale cheese'),
            alternatives: [{ qty: '100 g', name: t('Scamorza', 'Scamorza cheese') }],
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
          { qty: '250 g', name: t('Petto di pollo', 'Chicken breast') },
          veg200,
          {
            qty: '100 g',
            name: t('Pane integrale', 'Wholegrain bread'),
            alternatives: [{ qty: '80 g', name: t('Wasa Original', 'Wasa Original crispbread') }],
          },
          oil2,
        ],
        tips: [
          t(
            'Al posto del piatto di verdure va bene anche una vellutata di verdure di stagione.',
            'A seasonal vegetable soup works just as well as the plate of vegetables.',
          ),
        ],
      },
    },
  },

  {
    id: 'thu',
    meals: {
      breakfast: { items: [breadOrWasa, nutButter, fruit] },
      morningSnack: { items: [{ qty: '20 g', name: t('Frutta secca', 'Nuts') }] },
      lunch: {
        items: [
          {
            qty: '120 g',
            name: t('Bresaola', 'Bresaola'),
            alternatives: [{ qty: '120 g', name: t('Prosciutto crudo', 'Prosciutto crudo') }],
          },
          {
            qty: '70 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            alternatives: [{ qty: '90 g', name: t('Pane integrale', 'Wholegrain bread') }],
          },
          {
            ...veg200,
            alternatives: [
              { qty: '100 g', name: t('Insalata', 'Salad'), hint: t('Una ciotola', 'One bowl') },
            ],
          },
          oil2,
        ],
      },
      afternoonSnack: { items: [proteinScoop] },
      dinner: {
        items: [
          {
            qty: '80 g',
            name: t('Pasta di semola', 'Durum wheat pasta'),
            alternatives: [{ qty: '80 g', name: t('Riso basmati', 'Basmati rice') }],
          },
          lentils240,
          vegOrSalad70,
          oil2,
        ],
      },
    },
  },

  {
    id: 'fri',
    meals: {
      breakfast: { items: [breadOrWasa, nutButter, fruit] },
      lunch: {
        items: [
          konjac,
          cherryVeg,
          { qty: '100 g', name: t('Mozzarella proteica', 'High-protein mozzarella') },
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
          { qty: '100 g', name: t('Pasta di semola', 'Durum wheat pasta') },
          veg200,
          { qty: '250 g', name: t('Petto di pollo', 'Chicken breast') },
          oil2,
        ],
        tips: [
          t(
            'Pasta con sugo di peperoni o pesto di rucola.',
            'Pasta with pepper sauce or rocket pesto.',
          ),
          t('Petto di pollo con le verdure.', 'Chicken breast with the vegetables.'),
        ],
      },
    },
  },

  {
    id: 'sat',
    meals: {
      breakfast: { items: [breadOrWasa, turkeyOrBresaola, fruit] },
      lunch: {
        items: [
          konjac,
          cherryVeg,
          { qty: '250 g', name: t('Lenticchie in scatola', 'Canned lentils') },
          oil2,
          fruit,
        ],
      },
      afternoonSnack: { items: [proteinScoop] },
      dinner: {
        items: [],
        free: true,
        tips: [
          t(
            'Il piano non fissa una cena per oggi: è il pasto libero della settimana.',
            'The plan sets no dinner today: this is the free meal of the week.',
          ),
        ],
      },
    },
  },

  {
    id: 'sun',
    meals: {
      breakfast: { items: [fruit, nuts30] },
      morningSnack: {
        items: [proteinScoop],
        tips: [t('Bevilo come frullato.', 'Drink it as a shake.')],
      },
      lunch: {
        items: [
          { qty: '120 g', name: t('Pasta di semola integrale', 'Wholewheat durum pasta') },
          veg200,
          oil2,
          { qty: '25 g', name: t('Parmigiano Reggiano', 'Parmigiano Reggiano') },
        ],
        tips: [
          t(
            'Pasta con verdure miste, pomodoro o pesto.',
            'Pasta with mixed vegetables, tomato or pesto.',
          ),
          t(
            'Servi il parmigiano e le verdure a parte.',
            'Serve the Parmigiano and vegetables on the side.',
          ),
        ],
      },
      afternoonSnack: { items: [vanillaPot] },
      dinner: {
        items: [
          {
            qty: '100 g',
            name: t('Insalata', 'Salad'),
            hint: t('Una ciotola', 'One bowl'),
            alternatives: [{ qty: '200 g', name: t('Verdure o ortaggi', 'Vegetables') }],
          },
          { qty: '220 g', name: t('Uova di gallina', 'Eggs'), hint: t('4 uova', '4 eggs') },
          {
            qty: '50 g',
            name: t('Wasa Original', 'Wasa Original crispbread'),
            hint: t('5 fette', '5 slices'),
          },
          oil2,
          fruit,
        ],
        tips: [
          t(
            'Insalatona con tonno e un legume a scelta, più verdure miste.',
            'A big salad with tuna and a pulse of your choice, plus mixed vegetables.',
          ),
          t(
            'Per una zuppa: minestrone o vellutata con le verdure che preferisci — zucca, zucchine, cipolle, carote, cavolo nero — più una patata da 120-130 g oppure 2-3 cucchiai di riso, e 100 g di legumi già cotti.',
            'For a soup: minestrone or velouté with the vegetables you like — pumpkin, courgettes, onions, carrots, black kale — plus a 120-130 g potato or 2-3 tablespoons of rice, and 100 g of cooked pulses.',
          ),
          t(
            'Per una minestrina: brodo vegetale o di carne con 30 g di pastina o riso e una piccola porzione di secondo.',
            'For a light soup: vegetable or meat broth with 30 g of small pasta or rice and a small portion of a main.',
          ),
          t(
            'Aggiungi sempre un contorno di verdure con un filo d’olio extravergine a crudo.',
            'Always add a vegetable side with a drizzle of raw extra virgin olive oil.',
          ),
        ],
      },
    },
  },
]
