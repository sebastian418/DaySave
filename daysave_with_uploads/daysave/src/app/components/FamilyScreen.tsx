import { Upload, Clock, Heart, Camera } from 'lucide-react';

const familyMembers = [
  {
    id: 1,
    name: 'Sarah (Daughter)',
    avatar: 'S',
    lastActive: '2 hours ago',
    color: 'bg-secondary',
  },
  {
    id: 2,
    name: 'Michael (Son)',
    avatar: 'M',
    lastActive: '1 day ago',
    color: 'bg-primary',
  },
  {
    id: 3,
    name: 'Emma (Granddaughter)',
    avatar: 'E',
    lastActive: '3 hours ago',
    color: 'bg-secondary',
  },
  {
    id: 4,
    name: 'Tom (Husband)',
    avatar: 'T',
    lastActive: 'Active now',
    color: 'bg-primary',
  },
];

const sharedMemories = [
  {
    id: 1,
    uploader: 'Sarah',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop',
    caption: 'Mom teaching Emma how to bake cookies',
    time: '2 hours ago',
    likes: 3,
  },
  {
    id: 2,
    uploader: 'Michael',
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?w=400&h=300&fit=crop',
    caption: "Sunday family dinner at Mom's place",
    time: '1 day ago',
    likes: 5,
  },
  {
    id: 3,
    uploader: 'Tom',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop',
    caption: 'Our morning walk together',
    time: '3 days ago',
    likes: 4,
  },
];

export default function FamilyScreen() {
  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="max-w-md mx-auto px-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-primary">Our Memory Box</h1>
          <p className="text-muted-foreground text-lg mt-1">
            Shared with family
          </p>
        </div>

        {/* Family Members */}
        <div className="bg-card border border-border rounded-3xl p-5 space-y-4">
          <h3 className="text-lg font-semibold">Family Members</h3>
          <div className="space-y-3">
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-accent transition-colors"
              >
                <div
                  className={`${member.color} text-primary-foreground w-14 h-14 rounded-full flex items-center justify-center text-xl font-semibold`}
                >
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-0.5">
                    <Clock size={14} />
                    <span>{member.lastActive}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upload for Patient Button */}
        <button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-4 rounded-2xl text-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md">
          <Upload size={24} />
          Upload for Margaret
        </button>

        {/* Shared Memory Feed */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Family Timeline</h3>
          {sharedMemories.map((memory) => (
            <div
              key={memory.id}
              className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg">Shared by {memory.uploader}</h4>
                  <p className="text-sm text-muted-foreground">{memory.time}</p>
                </div>
                <Camera size={20} className="text-secondary" />
              </div>

              {/* Image */}
              <div className="aspect-video bg-gradient-to-br from-secondary/20 to-primary/10">
                <img
                  src={memory.image}
                  alt={memory.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption and Likes */}
              <div className="p-4 space-y-3">
                <p className="text-base">{memory.caption}</p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Heart size={20} className="fill-primary text-primary" />
                  <span className="text-sm font-medium">
                    {memory.likes} family members loved this
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
