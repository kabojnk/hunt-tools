export type Rank = 'B' | 'A' | 'S' | 'SS';
export type Expansion = 'ARR' | 'HW' | 'SB' | 'ShB' | 'EW' | 'DT';

export interface HuntMark {
  id: string;
  name: string;
  rank: Rank;
  expansion: Expansion;
  zone: string;
  region: string;
}

function mark(name: string, rank: Rank, expansion: Expansion, zone: string, region: string): HuntMark {
  const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return { id: `${slug(expansion)}-${slug(zone)}-${slug(name)}`, name, rank, expansion, zone, region };
}

export const HUNT_MARKS: HuntMark[] = [
  // ── A REALM REBORN ────────────────────────────────────────────────────────
  // B-Rank
  mark('Skogs Fru',            'B', 'ARR', 'North Shroud',            'The Black Shroud'),
  mark('Monarch Ogrefly',      'B', 'ARR', 'East Shroud',             'The Black Shroud'),
  mark('Stinging Sophie',      'B', 'ARR', 'South Shroud',            'The Black Shroud'),
  mark('White Joker',          'B', 'ARR', 'Central Shroud',          'The Black Shroud'),
  mark('Phecda',               'B', 'ARR', 'Mor Dhona',               'Mor Dhona'),
  mark('Leech King',           'B', 'ARR', 'Coerthas Central Highlands', 'Coerthas'),
  mark('Naul',                 'B', 'ARR', 'Coerthas Central Highlands', 'Coerthas'),
  mark('Dark Helmet',          'B', 'ARR', 'Lower La Noscea',         'La Noscea'),
  mark('Bloody Mary',          'B', 'ARR', 'Middle La Noscea',        'La Noscea'),
  mark('Barbastelle',          'B', 'ARR', 'Eastern La Noscea',       'La Noscea'),
  mark('Skogs Fru',            'B', 'ARR', 'Western La Noscea',       'La Noscea'),
  mark('Vuokho',               'B', 'ARR', 'Outer La Noscea',         'La Noscea'),
  mark('Myradrosh',            'B', 'ARR', 'Upper La Noscea',         'La Noscea'),
  mark('Ovjang',               'B', 'ARR', 'Central Thanalan',        'Thanalan'),
  mark('Sewer Syrup',          'B', 'ARR', 'Eastern Thanalan',        'Thanalan'),
  mark('Albin the Ashen',      'B', 'ARR', 'Western Thanalan',        'Thanalan'),
  mark('Gatling',              'B', 'ARR', 'Northern Thanalan',       'Thanalan'),
  mark('Flame Sergeant Dalvag','B', 'ARR', 'Southern Thanalan',       'Thanalan'),

  // A-Rank
  mark('Vogaal Ja',            'A', 'ARR', 'North Shroud',            'The Black Shroud'),
  mark('Forneus',              'A', 'ARR', 'East Shroud',             'The Black Shroud'),
  mark('Ghede Ti Malice',      'A', 'ARR', 'South Shroud',            'The Black Shroud'),
  mark('Melt',                 'A', 'ARR', 'Central Shroud',          'The Black Shroud'),
  mark('Kurrea',               'A', 'ARR', 'Mor Dhona',               'Mor Dhona'),
  mark('Marraco',              'A', 'ARR', 'Coerthas Central Highlands', 'Coerthas'),
  mark('Girtab',               'A', 'ARR', 'Coerthas Central Highlands', 'Coerthas'),
  mark('Nahn',                 'A', 'ARR', 'Lower La Noscea',         'La Noscea'),
  mark('Hellsclaw',            'A', 'ARR', 'Middle La Noscea',        'La Noscea'),
  mark('Unktehi',              'A', 'ARR', 'Eastern La Noscea',       'La Noscea'),
  mark('Marberry',             'A', 'ARR', 'Western La Noscea',       'La Noscea'),
  mark('Cornu',                'A', 'ARR', 'Outer La Noscea',         'La Noscea'),
  mark('Alectryon',            'A', 'ARR', 'Upper La Noscea',         'La Noscea'),
  mark('Sabotender Bailarina',  'A', 'ARR', 'Central Thanalan',        'Thanalan'),
  mark('Zanig\'oh',            'A', 'ARR', 'Eastern Thanalan',        'Thanalan'),
  mark('Dalvag\'s Final Flame', 'A', 'ARR', 'Western Thanalan',        'Thanalan'),
  mark('Maahes',               'A', 'ARR', 'Northern Thanalan',       'Thanalan'),

  // S-Rank
  mark('Laideronnette',        'S', 'ARR', 'North Shroud',            'The Black Shroud'),
  mark('Wulgaru',              'S', 'ARR', 'East Shroud',             'The Black Shroud'),
  mark('Mindflayer',           'S', 'ARR', 'South Shroud',            'The Black Shroud'),
  mark('Thousand-cast Theda',  'S', 'ARR', 'Central Shroud',          'The Black Shroud'),
  mark('Safat',                'S', 'ARR', 'Mor Dhona',               'Mor Dhona'),
  mark('Agrippa the Mighty',   'S', 'ARR', 'Coerthas Central Highlands', 'Coerthas'),
  mark('Croakadile',           'S', 'ARR', 'Lower La Noscea',         'La Noscea'),
  mark('Croque-Mitaine',       'S', 'ARR', 'Middle La Noscea',        'La Noscea'),
  mark('Bonnacon',             'S', 'ARR', 'Eastern La Noscea',       'La Noscea'),
  mark('The Garlok',           'S', 'ARR', 'Western La Noscea',       'La Noscea'),
  mark('Nandi',                'S', 'ARR', 'Outer La Noscea',         'La Noscea'),
  mark('Chernobog',            'S', 'ARR', 'Upper La Noscea',         'La Noscea'),
  mark('Zona Seeker',          'S', 'ARR', 'Central Thanalan',        'Thanalan'),
  mark('Brontes',              'S', 'ARR', 'Eastern Thanalan',        'Thanalan'),
  mark('Lampalagua',           'S', 'ARR', 'Western Thanalan',        'Thanalan'),
  mark('Nunyunuwi',            'S', 'ARR', 'Southern Thanalan',       'Thanalan'),
  mark('Minhocao',             'S', 'ARR', 'Northern Thanalan',       'Thanalan'),

  // ── HEAVENSWARD ───────────────────────────────────────────────────────────
  // B-Rank
  mark('Alteci',               'B', 'HW', 'Coerthas Western Highlands', 'Coerthas'),
  mark('Kreutzet',             'B', 'HW', 'Coerthas Western Highlands', 'Coerthas'),
  mark('Gnath Cometdrone',     'B', 'HW', 'Dravanian Forelands',      'Dravania'),
  mark('Thextera',             'B', 'HW', 'Dravanian Forelands',      'Dravania'),
  mark('Scitalis',             'B', 'HW', 'Churning Mists',           'Dravania'),
  mark('The Scarecrow',        'B', 'HW', 'Churning Mists',           'Dravania'),
  mark('Squonk',               'B', 'HW', 'Sea of Clouds',            'Abalathia\'s Spine'),
  mark('Sanu Vali of Dancing Wings', 'B', 'HW', 'Sea of Clouds',      'Abalathia\'s Spine'),
  mark('Pterygotus',           'B', 'HW', 'Dravanian Hinterlands',    'Dravania'),
  mark('False Gigantopithecus', 'B', 'HW', 'Dravanian Hinterlands',   'Dravania'),
  mark('Lycidas',              'B', 'HW', 'Azys Lla',                 'Abalathia\'s Spine'),
  mark('Omni',                 'B', 'HW', 'Azys Lla',                 'Abalathia\'s Spine'),

  // A-Rank
  mark('Mirka',                'A', 'HW', 'Coerthas Western Highlands', 'Coerthas'),
  mark('Lyuba',                'A', 'HW', 'Coerthas Western Highlands', 'Coerthas'),
  mark('Pylraster',            'A', 'HW', 'Dravanian Forelands',      'Dravania'),
  mark('Lord of the Wyverns',  'A', 'HW', 'Dravanian Forelands',      'Dravania'),
  mark('Bune',                 'A', 'HW', 'Churning Mists',           'Dravania'),
  mark('Agathos',              'A', 'HW', 'Churning Mists',           'Dravania'),
  mark('Enkelados',            'A', 'HW', 'Sea of Clouds',            'Abalathia\'s Spine'),
  mark('Sisiutl',              'A', 'HW', 'Sea of Clouds',            'Abalathia\'s Spine'),
  mark('Slipkinx Steeljoints', 'A', 'HW', 'Dravanian Hinterlands',    'Dravania'),
  mark('Stolas',               'A', 'HW', 'Dravanian Hinterlands',    'Dravania'),
  mark('Campacti',             'A', 'HW', 'Azys Lla',                 'Abalathia\'s Spine'),
  mark('Stench Blossom',       'A', 'HW', 'Azys Lla',                 'Abalathia\'s Spine'),

  // S-Rank
  mark('Kaiser Behemoth',      'S', 'HW', 'Coerthas Western Highlands', 'Coerthas'),
  mark('Senmurv',              'S', 'HW', 'Dravanian Forelands',      'Dravania'),
  mark('Gandarewa',            'S', 'HW', 'Churning Mists',           'Dravania'),
  mark('Bird of Paradise',     'S', 'HW', 'Sea of Clouds',            'Abalathia\'s Spine'),
  mark('The Pale Rider',       'S', 'HW', 'Dravanian Hinterlands',    'Dravania'),
  mark('Leucrotta',            'S', 'HW', 'Azys Lla',                 'Abalathia\'s Spine'),

  // ── STORMBLOOD ────────────────────────────────────────────────────────────
  // B-Rank
  mark('Shadow-dweller Yamini','B', 'SB', 'The Fringes',             'Gyr Abania'),
  mark('Ouzelum',              'B', 'SB', 'The Fringes',             'Gyr Abania'),
  mark('Gwas-y-neidr',        'B', 'SB', 'The Peaks',               'Gyr Abania'),
  mark('Buccaboo',             'B', 'SB', 'The Peaks',               'Gyr Abania'),
  mark('Guhuo Niao',           'B', 'SB', 'The Lochs',               'Gyr Abania'),
  mark('Gauki Strongblade',    'B', 'SB', 'The Lochs',               'Gyr Abania'),
  mark('Gyorai Quickstrike',   'B', 'SB', 'The Ruby Sea',            'Othard'),
  mark('Deidar',               'B', 'SB', 'The Ruby Sea',            'Othard'),
  mark('Aswang',               'B', 'SB', 'Yanxia',                  'Othard'),
  mark('Kurma',                'B', 'SB', 'Yanxia',                  'Othard'),
  mark('Kiwa',                 'B', 'SB', 'The Azim Steppe',         'Othard'),
  mark('Manes',                'B', 'SB', 'The Azim Steppe',         'Othard'),

  // A-Rank
  mark('Orcus',                'A', 'SB', 'The Fringes',             'Gyr Abania'),
  mark('Vochstein',            'A', 'SB', 'The Fringes',             'Gyr Abania'),
  mark('Erle',                 'A', 'SB', 'The Peaks',               'Gyr Abania'),
  mark('Aqrabuamelu',          'A', 'SB', 'The Peaks',               'Gyr Abania'),
  mark('Mahisha',              'A', 'SB', 'The Lochs',               'Gyr Abania'),
  mark('Luminare',             'A', 'SB', 'The Lochs',               'Gyr Abania'),
  mark('Funa Yurei',           'A', 'SB', 'The Ruby Sea',            'Othard'),
  mark('Oni Yumemi',           'A', 'SB', 'The Ruby Sea',            'Othard'),
  mark('Gajasura',             'A', 'SB', 'Yanxia',                  'Othard'),
  mark('Angada',               'A', 'SB', 'Yanxia',                  'Othard'),
  mark('Sum',                  'A', 'SB', 'The Azim Steppe',         'Othard'),
  mark('Girimekhala',          'A', 'SB', 'The Azim Steppe',         'Othard'),

  // S-Rank
  mark('Udumbara',             'S', 'SB', 'The Fringes',             'Gyr Abania'),
  mark('Bone Crawler',         'S', 'SB', 'The Peaks',               'Gyr Abania'),
  mark('Salt and Light',       'S', 'SB', 'The Lochs',               'Gyr Abania'),
  mark('Okina',                'S', 'SB', 'The Ruby Sea',            'Othard'),
  mark('Gamma',                'S', 'SB', 'Yanxia',                  'Othard'),
  mark('Orghana',              'S', 'SB', 'The Azim Steppe',         'Othard'),

  // ── SHADOWBRINGERS ────────────────────────────────────────────────────────
  // B-Rank
  mark('La Velue',             'B', 'ShB', 'Lakeland',               'Norvrandt'),
  mark('Itzpapalotl',          'B', 'ShB', 'Lakeland',               'Norvrandt'),
  mark('Domovoi',              'B', 'ShB', 'Kholusia',               'Norvrandt'),
  mark('Vulpangue',            'B', 'ShB', 'Kholusia',               'Norvrandt'),
  mark('Coquecigrue',          'B', 'ShB', 'Il Mheg',                'Norvrandt'),
  mark('Indomitable',          'B', 'ShB', 'Il Mheg',                'Norvrandt'),
  mark('Worm of the Well',     'B', 'ShB', 'Rak\'tika Greatwood',    'Norvrandt'),
  mark('Juggler Hecatomb',     'B', 'ShB', 'Rak\'tika Greatwood',    'Norvrandt'),
  mark('Mindmaker',            'B', 'ShB', 'Amh Araeng',             'Norvrandt'),
  mark('Pachamama',            'B', 'ShB', 'Amh Araeng',             'Norvrandt'),
  mark('Deacon',               'B', 'ShB', 'The Tempest',            'Norvrandt'),
  mark('Gilshs Aath Swiftclaw','B', 'ShB', 'The Tempest',            'Norvrandt'),

  // A-Rank
  mark('Nariphon',             'A', 'ShB', 'Lakeland',               'Norvrandt'),
  mark('Nuckelavee',           'A', 'ShB', 'Lakeland',               'Norvrandt'),
  mark('O Poorest Pauldia',    'A', 'ShB', 'Kholusia',               'Norvrandt'),
  mark('The Mudman',           'A', 'ShB', 'Kholusia',               'Norvrandt'),
  mark('Li\'l Murderer',       'A', 'ShB', 'Il Mheg',                'Norvrandt'),
  mark('Huracan',              'A', 'ShB', 'Il Mheg',                'Norvrandt'),
  mark('Maliktender',          'A', 'ShB', 'Rak\'tika Greatwood',    'Norvrandt'),
  mark('Sugaar',               'A', 'ShB', 'Rak\'tika Greatwood',    'Norvrandt'),
  mark('Grassman',             'A', 'ShB', 'Amh Araeng',             'Norvrandt'),
  mark('Supay',                'A', 'ShB', 'Amh Araeng',             'Norvrandt'),
  mark('Baal',                 'A', 'ShB', 'The Tempest',            'Norvrandt'),
  mark('Rusalka',              'A', 'ShB', 'The Tempest',            'Norvrandt'),

  // S-Rank
  mark('Tyger',                'S', 'ShB', 'Lakeland',               'Norvrandt'),
  mark('Forgiven Pedantry',    'S', 'ShB', 'Kholusia',               'Norvrandt'),
  mark('Aglaope',              'S', 'ShB', 'Il Mheg',                'Norvrandt'),
  mark('Ixtab',                'S', 'ShB', 'Rak\'tika Greatwood',    'Norvrandt'),
  mark('Tarchia',              'S', 'ShB', 'Amh Araeng',             'Norvrandt'),
  mark('Gunitt',               'S', 'ShB', 'The Tempest',            'Norvrandt'),

  // SS-Rank
  mark('Forgiven Rebellion',   'SS', 'ShB', 'Norvrandt',             'Norvrandt'),

  // ── ENDWALKER ─────────────────────────────────────────────────────────────
  // B-Rank
  mark('Ü-u-ü-u',             'B', 'EW', 'Labyrinthos',             'Labyrinthos'),
  mark('Green Archon',         'B', 'EW', 'Labyrinthos',             'Labyrinthos'),
  mark('Iravati',              'B', 'EW', 'Thavnair',                'Thavnair'),
  mark('Vajrakumara',          'B', 'EW', 'Thavnair',                'Thavnair'),
  mark('Emperor\'s Rose',      'B', 'EW', 'Garlemald',               'Garlemald'),
  mark('Warmonger',            'B', 'EW', 'Garlemald',               'Garlemald'),
  mark('Genesis Rock',         'B', 'EW', 'Mare Lamentorum',         'The Sea of Stars'),
  mark('Daphnia Magna',        'B', 'EW', 'Mare Lamentorum',         'The Sea of Stars'),
  mark('Shockmaw',             'B', 'EW', 'Elpis',                   'The Sea of Stars'),
  mark('Yumcax',               'B', 'EW', 'Elpis',                   'The Sea of Stars'),
  mark('Oskh Rhei',            'B', 'EW', 'Ultima Thule',            'The Sea of Stars'),
  mark('Level Cheater',        'B', 'EW', 'Ultima Thule',            'The Sea of Stars'),

  // A-Rank
  mark('Hulder',               'A', 'EW', 'Labyrinthos',             'Labyrinthos'),
  mark('Storsie',              'A', 'EW', 'Labyrinthos',             'Labyrinthos'),
  mark('Sugriva',              'A', 'EW', 'Thavnair',                'Thavnair'),
  mark('Yilan',                'A', 'EW', 'Thavnair',                'Thavnair'),
  mark('Aegeiros',             'A', 'EW', 'Garlemald',               'Garlemald'),
  mark('Minerva',              'A', 'EW', 'Garlemald',               'Garlemald'),
  mark('Mousse Princess',      'A', 'EW', 'Mare Lamentorum',         'The Sea of Stars'),
  mark('Lunatender Queen',     'A', 'EW', 'Mare Lamentorum',         'The Sea of Stars'),
  mark('Petalodus',            'A', 'EW', 'Elpis',                   'The Sea of Stars'),
  mark('Gurangatch',           'A', 'EW', 'Elpis',                   'The Sea of Stars'),
  mark('Arch-Eta',             'A', 'EW', 'Ultima Thule',            'The Sea of Stars'),
  mark('Fan Ail',              'A', 'EW', 'Ultima Thule',            'The Sea of Stars'),

  // S-Rank
  mark('Burfurlur the Canny',  'S', 'EW', 'Labyrinthos',             'Labyrinthos'),
  mark('Sphatika',             'S', 'EW', 'Thavnair',                'Thavnair'),
  mark('Armstrong',            'S', 'EW', 'Garlemald',               'Garlemald'),
  mark('Ruminator',            'S', 'EW', 'Mare Lamentorum',         'The Sea of Stars'),
  mark('Ophioneus',            'S', 'EW', 'Elpis',                   'The Sea of Stars'),
  mark('Narrow-rift',          'S', 'EW', 'Ultima Thule',            'The Sea of Stars'),

  // SS-Rank
  mark('Ker',                  'SS', 'EW', 'Ultima Thule',           'The Sea of Stars'),

  // ── DAWNTRAIL ─────────────────────────────────────────────────────────────
  // B-Rank
  mark('Go\'ozoabek\'be',      'B', 'DT', 'Kozama\'uka',             'Tural'),
  mark('The Slammer',          'B', 'DT', 'Kozama\'uka',             'Tural'),
  mark('Chupacabra',           'B', 'DT', 'Urqopacha',               'Tural'),
  mark('Mad Maguey',           'B', 'DT', 'Urqopacha',               'Tural'),
  mark('Leafscourge Hadoll Ja','B', 'DT', 'Yak T\'el',               'Tural'),
  mark('Xty\'iinbek',          'B', 'DT', 'Yak T\'el',               'Tural'),
  mark('Nopalitender Fabuloso','B', 'DT', 'Shaaloani',               'Tural'),
  mark('Uktena',               'B', 'DT', 'Shaaloani',               'Tural'),
  mark('Gallowsbeak',          'B', 'DT', 'Heritage Found',          'Tural'),
  mark('Gargant',              'B', 'DT', 'Heritage Found',          'Tural'),
  mark('13th Child',           'B', 'DT', 'Living Memory',           'Tural'),
  mark('Jewel Bearer',         'B', 'DT', 'Living Memory',           'Tural'),

  // A-Rank
  mark('Pkuucha',              'A', 'DT', 'Kozama\'uka',             'Tural'),
  mark('The Raintriller',      'A', 'DT', 'Kozama\'uka',             'Tural'),
  mark('Nechuciho',            'A', 'DT', 'Urqopacha',               'Tural'),
  mark('Queen Hawk',           'A', 'DT', 'Urqopacha',               'Tural'),
  mark('Rrax Yity\'a',         'A', 'DT', 'Yak T\'el',               'Tural'),
  mark('Starcrier',            'A', 'DT', 'Yak T\'el',               'Tural'),
  mark('Keheniheyamewi',       'A', 'DT', 'Shaaloani',               'Tural'),
  mark('Yehehetoaua\'pyo',     'A', 'DT', 'Shaaloani',               'Tural'),
  mark('Heshuala',             'A', 'DT', 'Heritage Found',          'Tural'),
  mark('Urna Variabilis',      'A', 'DT', 'Heritage Found',          'Tural'),
  mark('Cat\'s Eye',           'A', 'DT', 'Living Memory',           'Tural'),
  mark('Sally the Sweeper',    'A', 'DT', 'Living Memory',           'Tural'),

  // S-Rank
  mark('Ihnuxokiy',            'S', 'DT', 'Kozama\'uka',             'Tural'),
  mark('Kirlirger the Abhorrent', 'S', 'DT', 'Urqopacha',            'Tural'),
  mark('Neyoozoteel',          'S', 'DT', 'Yak T\'el',               'Tural'),
  mark('Sansheya',             'S', 'DT', 'Shaaloani',               'Tural'),
  mark('Atticus the Primogenitor', 'S', 'DT', 'Heritage Found',      'Tural'),
  mark('The Forecaster',       'S', 'DT', 'Living Memory',           'Tural'),

  // SS-Rank
  mark('Arch Aethereater',     'SS', 'DT', 'Tural',                  'Tural'),
];
