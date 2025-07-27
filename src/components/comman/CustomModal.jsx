import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";

export default function CustomModal({ open, onClose, header, body, footer }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const muiTheme = useMuiTheme();
  const fullScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        className: [
          "!rounded-none",
          isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900",
        ].join(" "),
      }}
    >
      {header && (
        <DialogTitle
          className={[
            "text-xl font-semibold px-6 pt-6",
            isDark
              ? "border-b border-gray-700 bg-gray-900"
              : "border-b border-gray-200",
          ].join(" ")}
        >
          {header}
        </DialogTitle>
      )}

      <DialogContent
        className={`px-6 py-4 overflow-auto ${isDark ? "bg-gray-900" : ""}`}
      >
        {body}
      </DialogContent>

      {footer && (
        <DialogActions
          className={[
            "px-6 pb-6",
            isDark
              ? "border-t border-gray-700 bg-gray-900"
              : "border-t border-gray-200",
          ].join(" ")}
        >
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
}

CustomModal.propTypes = {
  /** Whether the modal is open */
  open: PropTypes.bool.isRequired,
  /** Close handler */
  onClose: PropTypes.func.isRequired,
  /** Content to render in the header (e.g. title or custom toolbar) */
  header: PropTypes.node,
  /** Main body/content of the modal */
  body: PropTypes.node,
  /** Footer area (e.g. action buttons) */
  footer: PropTypes.node,
};

CustomModal.defaultProps = {
  header: null,
  body: null,
  footer: null,
};
