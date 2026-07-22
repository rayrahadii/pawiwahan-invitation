export interface WeddingEvent {
  id: string;
  title: string;
  dateLabel: string;
  timeLabel: string;
  venueName: string;
  venueAddress: string;
  mapsUrl: string;
  /** ISO string, used to build the "add to calendar" link */
  isoDate: string;
  isoDateEnd: string;
}

export interface LoveStoryMoment {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  logo?: string;
}

export interface Wish {
  id: string;
  name: string;
  attendance: "hadir" | "tidak_hadir" | "ragu";
  guestCount: number;
  message: string;
  createdAt: string;
}

export interface InvitationData {
  brideNickname: string;
  groomNickname: string;
  brideFullName: string;
  groomFullName: string;
  brideParents: string;
  groomParents: string;
  brideInstagram: string;
  groomInstagram: string;
  weddingDateLabel: string;
  targetDate: string; // ISO string used for the countdown
  quote: {
    lead: string;
    body: string;
    source: string;
  };
  events: WeddingEvent[];
  loveStory: LoveStoryMoment[];
  gallery: GalleryImage[];
  bankAccounts: BankAccount[];
  giftRegistryUrl: string;
  music: {
    title: string;
    src: string;
  };
}
