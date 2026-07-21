import { Inbox } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyState({ title = "No records found", message = "Try adjusting your filters or search query.", icon: Icon = Inbox }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 text-muted w-full"
    >
      <Icon className="w-12 h-12 mb-4 opacity-20" />
      <p className="font-medium text-foreground text-lg">{title}</p>
      <p className="text-sm mt-1 text-center max-w-[250px] leading-relaxed">
        {message}
      </p>
    </motion.div>
  );
}
