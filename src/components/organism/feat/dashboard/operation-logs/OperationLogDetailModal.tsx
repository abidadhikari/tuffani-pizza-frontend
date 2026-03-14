"use client";
import { useState } from "react";
import BaseModal from "@/components/molecule/BaseModal";
import { OperationLog } from "@/hooks/services/operation-logs/useGetOperationLogs";
import StatusBadge from "@/components/atom/StatusBadge";

interface OperationLogDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: OperationLog | null;
}

export default function OperationLogDetailModal({
  open,
  onOpenChange,
  log,
}: OperationLogDetailModalProps) {
  if (!log) return null;

  const getOperationColor = (operation: string) => {
    switch (operation) {
      case "CREATE":
        return "success";
      case "DELETE":
        return "error";
      case "UPDATE":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <BaseModal
      open={open}
      onOpenChange={onOpenChange}
      title={`Operation Details - ${log.id}`}
    >
      <div className="space-y-6 py-4">
        {/* Header Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Resource
            </label>
            <p className="text-base font-medium mt-1">
              {log.resource.toUpperCase()}
            </p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Operation
            </label>
            <div className="mt-1">
              <StatusBadge
                label={log.operation}
                variant={getOperationColor(log.operation) as any}
              />
            </div>
          </div>
        </div>

        {/* Entity Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Entity ID
            </label>
            <p className="text-sm font-mono mt-1 break-all">{log.entityId}</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">
              Operation ID
            </label>
            <p className="text-sm font-mono mt-1 break-all">{log.id}</p>
          </div>
        </div>

        {/* Actor Info */}
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-semibold mb-3 text-gray-800">Performed By</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <p className="text-sm font-medium mt-1">
                {log.performedBy?.name || "-"}
              </p>
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <p className="text-sm font-medium mt-1">
                {log.performedBy?.email || log.performedById}
              </p>
            </div>
            <div className="col-span-2">
              <label className="text-sm text-gray-600">User ID</label>
              <p className="text-sm font-mono mt-1">
                {log.performedBy?.id || log.performedById}
              </p>
            </div>
          </div>
        </div>

        {/* Network Info */}
        {(log.ipAddress || log.userAgent) && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-3 text-gray-800">Network Info</h3>
            {log.ipAddress && (
              <div className="mb-2">
                <label className="text-sm text-gray-600">IP Address</label>
                <p className="text-sm font-mono mt-1">{log.ipAddress}</p>
              </div>
            )}
            {log.userAgent && (
              <div>
                <label className="text-sm text-gray-600">User Agent</label>
                <p className="text-xs font-mono mt-1 break-all text-gray-700">
                  {log.userAgent}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Changes */}
        {log.changes && Object.keys(log.changes).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-3 text-gray-800">Changes</h3>
            <div className="space-y-3">
              {Object.entries(log.changes).map(([key, value]) => (
                <div
                  key={key}
                  className="border-b border-gray-200 pb-2 last:border-b-0"
                >
                  <label className="text-sm font-medium text-gray-700">
                    {key}
                  </label>
                  <pre className="text-xs bg-white p-2 rounded mt-1 overflow-auto max-h-32 text-gray-700">
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div className="border-t pt-4">
          <label className="text-sm font-semibold text-gray-700">
            Timestamp
          </label>
          <p className="text-sm font-mono mt-1">
            {new Date(log.createdAt || log.timestamp).toLocaleString()}
          </p>
        </div>
      </div>
    </BaseModal>
  );
}
