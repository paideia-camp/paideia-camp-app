import { useSocials, useLinkSocials } from "@campnetwork/origin/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Twitter, Music, Video, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface SocialsData {
  twitter: boolean;
  spotify: boolean;
  tiktok: boolean;
}

export const SocialLinking = () => {
  const { data, isLoading, error } = useSocials();
  const socials = data as SocialsData | undefined;
  const {
    linkTwitter,
    linkSpotify,
    linkTiktok,
    unlinkTwitter,
    unlinkSpotify,
    unlinkTiktok,
  } = useLinkSocials();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
          <CardDescription>Link your social media accounts</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Social Accounts</CardTitle>
          <CardDescription>Link your social media accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive">
            Failed to load social accounts. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  const handleLinkTwitter = async () => {
    try {
      await linkTwitter();
      toast.success("Twitter account linked successfully!");
    } catch (err) {
      toast.error("Failed to link Twitter account");
    }
  };

  const handleUnlinkTwitter = async () => {
    try {
      await unlinkTwitter();
      toast.success("Twitter account unlinked");
    } catch (err) {
      toast.error("Failed to unlink Twitter account");
    }
  };

  const handleLinkSpotify = async () => {
    try {
      await linkSpotify();
      toast.success("Spotify account linked successfully!");
    } catch (err) {
      toast.error("Failed to link Spotify account");
    }
  };

  const handleUnlinkSpotify = async () => {
    try {
      await unlinkSpotify();
      toast.success("Spotify account unlinked");
    } catch (err) {
      toast.error("Failed to unlink Spotify account");
    }
  };

  const handleLinkTiktok = async () => {
    const handle = prompt("Enter your TikTok handle:");
    if (!handle) return;

    try {
      await linkTiktok(handle);
      toast.success("TikTok account linked successfully!");
    } catch (err) {
      toast.error("Failed to link TikTok account");
    }
  };

  const handleUnlinkTiktok = async () => {
    try {
      await unlinkTiktok();
      toast.success("TikTok account unlinked");
    } catch (err) {
      toast.error("Failed to unlink TikTok account");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Accounts</CardTitle>
        <CardDescription>
          Link your social media accounts to build your on-chain reputation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Twitter */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Twitter className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Twitter</p>
              <p className="text-sm text-muted-foreground">
                {socials?.twitter ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          {socials?.twitter ? (
            <Button variant="outline" size="sm" onClick={handleUnlinkTwitter}>
              Unlink
            </Button>
          ) : (
            <Button size="sm" onClick={handleLinkTwitter}>
              Link
            </Button>
          )}
        </div>

        {/* Spotify */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium">Spotify</p>
              <p className="text-sm text-muted-foreground">
                {socials?.spotify ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          {socials?.spotify ? (
            <Button variant="outline" size="sm" onClick={handleUnlinkSpotify}>
              Unlink
            </Button>
          ) : (
            <Button size="sm" onClick={handleLinkSpotify}>
              Link
            </Button>
          )}
        </div>

        {/* TikTok */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Video className="h-5 w-5 text-pink-500" />
            <div>
              <p className="font-medium">TikTok</p>
              <p className="text-sm text-muted-foreground">
                {socials?.tiktok ? "Connected" : "Not connected"}
              </p>
            </div>
          </div>
          {socials?.tiktok ? (
            <Button variant="outline" size="sm" onClick={handleUnlinkTiktok}>
              Unlink
            </Button>
          ) : (
            <Button size="sm" onClick={handleLinkTiktok}>
              Link
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
